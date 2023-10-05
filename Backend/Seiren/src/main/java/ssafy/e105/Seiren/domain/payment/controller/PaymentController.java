package ssafy.e105.Seiren.domain.payment.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.payment.dto.PurchaseDto;
import ssafy.e105.Seiren.domain.payment.service.PaymentService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "결제 API")
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(summary = "상품 구매")
    @PostMapping("/api/purchase")
    public ApiResult<?> purchaseProduct(HttpServletRequest request,
            @RequestBody PurchaseDto purchaseDto) {
        paymentService.purchaseProduct(request, purchaseDto);
        return ApiUtils.success("성공적으로 상품을 구매하였습니다.");
    }
}
