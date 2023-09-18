package ssafy.e105.Seiren.domain.product.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
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
}
