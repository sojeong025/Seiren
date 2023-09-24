package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.CREATE_WiSH_ERROR;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.FAIL_DELETE_WISH;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.FAIL_GET_WISHLIST;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_PRODUCT;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_WISH;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.UNMACHED_WISH_USER;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCategoryDto;
import ssafy.e105.Seiren.domain.product.dto.ProductDto;
import ssafy.e105.Seiren.domain.product.dto.WishListDto;
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
public class WishService {

    private final WishRepository wishRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void addWish(HttpServletRequest request, Long productId) {
        User user = getUser(request);
        Product product = getProduct(productId);
        try {
            wishRepository.save(Wish.toEntity(user, product));
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(CREATE_WiSH_ERROR.getMessage(),
                    CREATE_WiSH_ERROR.getCode()));
        }
    }

    @Transactional
    public void deleteWish(HttpServletRequest request, Long productId) {
        User user = getUser(request);
        Wish wish = getWish(productId, user.getId());
        try {
            if (wish.getUser() == user) {
                wishRepository.delete(wish);
                return;
            }
            throw new BaseException(
                    new ApiError(UNMACHED_WISH_USER.getMessage(),
                            UNMACHED_WISH_USER.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_DELETE_WISH.getMessage(), FAIL_DELETE_WISH.getCode()));
        }
    }

    public WishListDto getAll(HttpServletRequest request) {
        User user = getUser(request);
        try {
            WishListDto wishListDto = new WishListDto();
            List<ProductDto> productDtoList = user.getWishes().stream()
                    .map(wish -> {
                        ProductDto productDto = new ProductDto();
                        List<ProductCategoryDto> productCategoryDtoList = new ArrayList<>();
                        for (ProductCategory productCategory : wish.getProduct()
                                .getProductCategories()) {
                            ProductCategoryDto productCategoryDto = new ProductCategoryDto(
                                    productCategory);
                            productCategoryDtoList.add(productCategoryDto);
                        }
                        productDto.setProductId(wish.getProduct().getProductId());
                        productDto.setTitle(wish.getProduct().getProductTitle());
                        productDto.setSummary(wish.getProduct().getSummary());
                        productDto.setProductImageUrl(wish.getProduct().getProductImageUrl());
                        productDto.setPrice(wish.getProduct().getPrice());
                        productDto.setProductCategoryList(productCategoryDtoList);
                        productDto.setWish(true);
                        return productDto;
                    })
                    .collect(Collectors.toList());
            wishListDto.setWishList(productDtoList);
            return wishListDto;
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_GET_WISHLIST.getMessage(), FAIL_GET_WISHLIST.getCode()));
        }
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    public Product getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_PRODUCT.getMessage(), NOT_EXIST_PRODUCT.getCode())));
    }

    public Wish getWish(Long productId, Long userId) {
        return wishRepository.findByUser_IdAndProduct_ProductId(userId, productId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_WISH.getMessage(), NOT_EXIST_WISH.getCode())));
    }

}
