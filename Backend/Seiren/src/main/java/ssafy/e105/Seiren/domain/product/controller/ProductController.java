package ssafy.e105.Seiren.domain.product.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.dto.ProductUpdateDto;
import ssafy.e105.Seiren.domain.product.service.ProductService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/api/products")
    public ApiResult<?> productCreate(@RequestBody ProductCreateRequest productCreateRequest,
            HttpServletRequest request) {
        productService.createProduct(productCreateRequest, request);
        return ApiUtils.success("성공적으로 상품을 등록하였습니다.");
    }

    @GetMapping("/api/product/{productId}")
    public ApiResult<?> productDetail(@PathVariable Long productId,
            HttpServletRequest request) {
        return ApiUtils.success(productService.getProductDetail(productId, request));
    }

    @PutMapping("/api/product/state/{productId}")
    public ApiResult<?> changeProductState(@PathVariable Long productId,
            HttpServletRequest request) {
        productService.changeState(productId, request);
        return ApiUtils.success("성공적으로 상품 상태를 변경하였습니다.");
    }

    @PutMapping("/api/product")
    public ApiResult<?> updateProduct(@RequestBody ProductUpdateDto productUpdateDto,
            HttpServletRequest request) {
        productService.updateProduct(productUpdateDto, request);
        return ApiUtils.success("성공적으로 상품 정보를 변경하였습니다.");
    }

}