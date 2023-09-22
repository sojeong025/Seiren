package ssafy.e105.Seiren.domain.transaction.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductTTSRequest;
import ssafy.e105.Seiren.domain.transaction.service.TransactionService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/transactions")
@Tag(name = "거래 API")
public class TransactionController {

    private final TransactionService transactionService;

    @Operation(description = "거래 상품 목록 리스트")
    @GetMapping()
    public ApiResult getTransactionProductList(HttpServletRequest request, @RequestParam("page") int page){
        return ApiUtils.success(transactionService.getTransactionProductList(request, page, 10));
    }

    @Operation(description = "거래 상품 상세 정보")
    @GetMapping("/detail/{productid}")
    public ApiResult getTransactionProductDetail(
            HttpServletRequest request,
            @PathVariable("productid") Long productId){
        return ApiUtils.success(transactionService.getTransactionProductDetail(request, productId));
    }

    @Operation(description = "TTS 등록")
    @PostMapping()
    public ApiResult registTTS(HttpServletRequest request, @RequestBody @Valid TransactionProductTTSRequest transactionProductTTSRequest){
        return ApiUtils.success(transactionService.registTTS(request, transactionProductTTSRequest));
    }

    @Operation(description = "구매 상품 사용 기록 리스트")
    @GetMapping("/history")
    public ApiResult getTransactionProductHistroy(@RequestParam("transactionid") Long transactionId, @RequestParam("page") int page){
        return ApiUtils.success(transactionService.getTransactionProductHistory(transactionId, page, 10));
    }

    @Operation(description = "총 구매 목소리 갯수")
    @GetMapping("/totalcount")
    public ApiResult getTransactionTotal(HttpServletRequest request){
        return ApiUtils.success(transactionService.getTransactionTotal(request));
    }

    @Operation(description = "목소리 구 목록 영수증")
    @GetMapping("/receipt")
    public ApiResult getTransactionProductReceipt(HttpServletRequest request, @RequestParam("page") int page){
        return ApiUtils.success(transactionService.getTransactionProductReceipt(request, page, 10));
    }
}
