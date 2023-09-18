package ssafy.e105.Seiren.domain.voice.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.service.RecordService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/api/records/recent/{voiceId}")
    public ApiResult<?> getCurrentVoiceRecentScriptId(HttpServletRequest request,
            @PathVariable Long voiceId) {
        return ApiUtils.success(recordService.getRecentScriptId(request, voiceId));
    }

    @GetMapping("/api/records/count/{voiceId}")
    public ApiResult<?> getRecordsCount(HttpServletRequest request, @PathVariable Long voiceId) {
        return ApiUtils.success(recordService.getRecordsCount(request, voiceId));
    }
}
