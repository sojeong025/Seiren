package ssafy.e105.Seiren.domain.purchase.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.purchase.service.PurchaseService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase")
@Tag(name = "구매 관련 API")
public class PurchaseController {

    private final PurchaseService purchaseService;

}
