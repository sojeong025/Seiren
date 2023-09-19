package ssafy.e105.Seiren.domain.product.controller;

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
public class PreviewController {

    private final PreviewService previewService;

    @GetMapping("/api/preview/{productId}")
    public ApiResult<?> productPreview(@PathVariable Long productId,
            HttpServletRequest request) {
        return ApiUtils.success(previewService.getProductPreview(productId, request));

    }

}
