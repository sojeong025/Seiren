package ssafy.e105.Seiren.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.service.TestHistoryService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "상품 테스트 TTS API")
public class TestHistoryController {

    private final TestHistoryService testHistoryService;

    @Operation(summary = "체험판 TTS")
    @PutMapping("/api/tts")
    public ApiResult<?> testTTS(@RequestParam Long productId,
            HttpServletRequest request) {
        System.out.println("api/tts 요청을 받았습니다");
        return ApiUtils.success(testHistoryService.checkTestCount(productId, request));
    }

    @Operation(summary = "체험판 TTS 남은 횟수 확인")
    @GetMapping("/api/tts/count/{productId}")
    public ApiResult<?> countTestHistory(@PathVariable Long productId, HttpServletRequest request) {
        System.out.println("api/tts/count 요청을 받았습니다.");
        return ApiUtils.success(testHistoryService.countTest(productId, request));
    }

}
