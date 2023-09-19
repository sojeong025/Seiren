package ssafy.e105.Seiren.domain.purchase.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ssafy.e105.Seiren.domain.purchase.service.PurchaseService;
import ssafy.e105.Seiren.global.common.BaseResponse;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase")
@Tag(name = "구매 관련 API")
public class PurchaseController {

    private final PurchaseService purchaseService;
    @Operation(summary = "구매 상품 목록")
    @GetMapping("/purchaseProducts")
    public ApiResult getPurchaseList(HttpServletRequest request, @RequestParam("page") int page){
        return ApiUtils.success(purchaseService.getPurchaseList(request, page, 10));
    }
}
