package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.FAIL_SEARCH_PRODUCT;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_WISH;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCategoryDto;
import ssafy.e105.Seiren.domain.product.dto.ProductDto;
import ssafy.e105.Seiren.domain.product.dto.ProductSearchRequest;
import ssafy.e105.Seiren.domain.product.dto.ProductSearchResponse;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.entity.Wish;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.product.repository.WishRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductRepository productRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;

    public ProductSearchResponse searchProduct(ProductSearchRequest searchRequest,
            HttpServletRequest request, Pageable pageable) {
        User user = getUser(request);

        try {
            // 닉네임 x 목록
            if (searchRequest.getNickname().isEmpty()) {
                // 최신순 정렬
                if (searchRequest.getSortType().equals("Latest")
                        || searchRequest.getSortType().isEmpty()) {
                    // 필터 선택 x
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        System.out.println("1");
                        Page<Product> productPage = productRepository.findAllProductsOrderByCreateAtDesc(
                                pageable);
                        return new ProductSearchResponse(getProductDtoList(productPage, user));
                    }
                    // 필터 선택 o
                    System.out.println("2");
                    Page<Product> productPage = productRepository.findProductsByCategoryIdsOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList(), pageable);
                    return new ProductSearchResponse(getProductDtoList(productPage, user));
                }
                // 판매순 정렬
                else if (searchRequest.getSortType().equals("Sales")) {
                    // 필터 선택 x
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        System.out.println("3");
                        Page<Product> productPage = productRepository.findProductsSortedByTotalCountSum(
                                pageable);
                        return new ProductSearchResponse(getProductDtoList(productPage, user));
                    }
                    // 필터 선택 o
                    System.out.println("4");
                    Page<Product> productPage = productRepository.findProductsByCategoryAndSortByTotalCountSum(
                            searchRequest.getCategoryIdList(), pageable);
                    return new ProductSearchResponse(getProductDtoList(productPage, user));
                }
            }
            // 닉네임 o 목록
            else if (searchRequest.getNickname() != null) {
                // 최신순 정렬
                if (searchRequest.getSortType().equals("Latest") || searchRequest.getSortType()
                        .isEmpty()) {
                    // 필터 선택 x
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        System.out.println("5");
                        Page<Product> productPage = productRepository.findAllProductByUserNickname(
                                searchRequest.getNickname(), pageable);
                        return new ProductSearchResponse(getProductDtoList(productPage, user));
                    }
                    // 필터 선택 o
                    System.out.println("6");
                    Page<Product> productPage = productRepository.findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList(), searchRequest.getNickname(),
                            pageable);
                    return new ProductSearchResponse(getProductDtoList(productPage, user));
                }
                // 판매순 정렬
                else if (searchRequest.getSortType().equals("Sales")) {
                    // 필터 선택 x
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        System.out.println("7");
                        Page<Product> productPage = productRepository.findProductsByNicknameSortedByTotalCountSum(
                                searchRequest.getNickname(), pageable);
                        return new ProductSearchResponse(getProductDtoList(productPage, user));
                    }
                    // 필터 선택 o
                    System.out.println("8");
                    Page<Product> productPage = productRepository.findProductsByCategoryIdsAndNicknameSortedByTotalCountSum(
                            searchRequest.getCategoryIdList(), searchRequest.getNickname(),
                            pageable);
                    return new ProductSearchResponse(getProductDtoList(productPage, user));
                }
            }
            throw new BaseException(
                    new ApiError(FAIL_SEARCH_PRODUCT.getMessage(), FAIL_SEARCH_PRODUCT.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_SEARCH_PRODUCT.getMessage(), FAIL_SEARCH_PRODUCT.getCode()));
        }
    }

    public List<ProductDto> getProductDtoList(Page<Product> productPage, User user) {
        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productPage) {
            List<ProductCategoryDto> productCategoryDtoList = new ArrayList<>();
            for (ProductCategory productCategory : product.getProductCategories()) {
                ProductCategoryDto productCategoryDto = new ProductCategoryDto(
                        productCategory);
                productCategoryDtoList.add(productCategoryDto);
            }
            Wish wish = getWish(product.getProductId(), user.getId());
            if (wish != null) {
                ProductDto productDto = new ProductDto(product, productCategoryDtoList, true);
                productDtoList.add(productDto);
                System.out.println("null 추가");
                continue;
            }
            ProductDto productDto = new ProductDto(product, productCategoryDtoList, false);
            productDtoList.add(productDto);
        }
        return productDtoList;
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    public Wish getWish(Long productId, Long userId) {
        Optional<Wish> wishOptional = wishRepository.findByUser_IdAndProduct_ProductId(userId,
                productId);
        // Wish를 찾았을 경우에 대한 처리
        if (wishOptional.isPresent()) {
            return wishOptional.get();
        }
        return null;
    }
}
