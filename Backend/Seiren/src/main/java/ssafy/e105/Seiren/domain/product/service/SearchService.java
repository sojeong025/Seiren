package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.FAIL_SEARCH_PRODUCT;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCategoryDto;
import ssafy.e105.Seiren.domain.product.dto.ProductDto;
import ssafy.e105.Seiren.domain.product.dto.ProductSearchRequest;
import ssafy.e105.Seiren.domain.product.dto.ProductSearchResponse;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductSearchResponse searchProduct(ProductSearchRequest searchRequest,
            HttpServletRequest request) {
        try {
            // 닉네임 x 목록
            if (searchRequest.getNickname().isEmpty()) {
                // 최신순 정렬
                if (searchRequest.getSortType().equals("Latest")) {
                    // 필터 선택 x 됨
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        List<Product> productList = productRepository.findAllProductsOrderByCreateAtDesc();
                        return new ProductSearchResponse(getProductDtoList(productList));
                    }
                    // 필터 선택 o 됨
                    List<Product> productList = productRepository.findProductsByCategoryIdsOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList());
                    return new ProductSearchResponse(getProductDtoList(productList));
                }
                // 판매순 정렬
                else if (searchRequest.getSortType().equals("Sales")) {
                    // 필터 선택 x -> 정렬 방법 수정 필요
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        List<Product> productList = productRepository.findAllProductsOrderByCreateAtDesc();
                        return new ProductSearchResponse(getProductDtoList(productList));
                    }
                    // 필터 선택 o -> 정렬 방법 수정 필요
                    List<Product> productList = productRepository.findProductsByCategoryIdsOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList());
                    return new ProductSearchResponse(getProductDtoList(productList));
                }
                throw new BaseException(
                        new ApiError(FAIL_SEARCH_PRODUCT.getMessage(),
                                FAIL_SEARCH_PRODUCT.getCode()));
            }
            // 닉네임 o 목록
            else if (searchRequest.getNickname() != null) {
                // 최신순 정렬
                if (searchRequest.getSortType().equals("Latest")) {
                    // 필터 선택 x 됨
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        List<Product> productList = productRepository.findAllProductByUserNickname(
                                searchRequest.getNickname());
                        return new ProductSearchResponse(getProductDtoList(productList));
                    }
                    // 필터 선택 o 됨
                    List<Product> productList = productRepository.findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList(), searchRequest.getNickname());
                    return new ProductSearchResponse(getProductDtoList(productList));
                }
                // 판매순 정렬
                else if (searchRequest.getSortType().equals("Sales")) {
                    // 필터 선택 x -> 정렬 방법 수정 필요
                    if (searchRequest.getCategoryIdList().isEmpty()) {
                        List<Product> productList = productRepository.findAllProductByUserNickname(
                                searchRequest.getNickname());
                        return new ProductSearchResponse(getProductDtoList(productList));
                    }
                    // 필터 선택 o -> 정렬 방법 수정 필요
                    List<Product> productList = productRepository.findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
                            searchRequest.getCategoryIdList(), searchRequest.getNickname());
                    return new ProductSearchResponse(getProductDtoList(productList));
                }
            }
            throw new BaseException(
                    new ApiError(FAIL_SEARCH_PRODUCT.getMessage(), FAIL_SEARCH_PRODUCT.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_SEARCH_PRODUCT.getMessage(), FAIL_SEARCH_PRODUCT.getCode()));
        }
    }

    public List<ProductDto> getProductDtoList(List<Product> productList) {
        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {
            List<ProductCategoryDto> productCategoryDtoList = new ArrayList<>();
            for (ProductCategory productCategory : product.getProductCategories()) {
                ProductCategoryDto productCategoryDto = new ProductCategoryDto(
                        productCategory);
                productCategoryDtoList.add(productCategoryDto);
            }
            ProductDto productDto = new ProductDto(product, productCategoryDtoList);
            productDtoList.add(productDto);
        }
        return productDtoList;
    }
}
