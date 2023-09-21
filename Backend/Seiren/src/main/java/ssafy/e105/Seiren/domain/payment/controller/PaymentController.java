package ssafy.e105.Seiren.domain.payment.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.payment.dto.PurchaseDto;
import ssafy.e105.Seiren.domain.payment.service.PaymentService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/api/purchase")
    public ApiResult<?> purchaseProduct(HttpServletRequest request,
            @RequestBody PurchaseDto purchaseDto) {
        paymentService.purchaseProduct(request, purchaseDto);
        return ApiUtils.success("성공적으로 상품을 구매하였습니다.");
    }
}
