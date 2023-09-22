package ssafy.e105.Seiren.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.service.PreviewService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "미리듣기 API")
public class PreviewController {

    private final PreviewService previewService;

    @Operation(summary = "상품 미리듣기 파일 url 목록")
    @GetMapping("/api/preview/{productId}")
    public ApiResult<?> productPreview(@PathVariable Long productId,
            HttpServletRequest request) {
        return ApiUtils.success(previewService.getProductPreview(productId, request));

    }

}
