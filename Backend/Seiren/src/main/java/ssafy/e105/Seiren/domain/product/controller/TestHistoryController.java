package ssafy.e105.Seiren.domain.product.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.dto.TestTTSRequest;
import ssafy.e105.Seiren.domain.product.service.TestHistoryService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class TestHistoryController {

    private final TestHistoryService testHistoryService;

    @PostMapping("/api/tts")
    public ApiResult<?> testTTS(@RequestBody TestTTSRequest testTTSRequestDto,
            HttpServletRequest request) {
        return ApiUtils.success(testHistoryService.createTestFile(testTTSRequestDto, request));
    }

    @GetMapping("/api/tts/count/{productId}")
    public ApiResult<?> countTestHistory(@PathVariable Long productId, HttpServletRequest request) {
        return ApiUtils.success(testHistoryService.countTest(productId, request));
    }

}
