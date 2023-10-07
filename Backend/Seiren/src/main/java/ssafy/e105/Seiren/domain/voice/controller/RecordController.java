package ssafy.e105.Seiren.domain.voice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ssafy.e105.Seiren.domain.voice.service.RecordService;
import ssafy.e105.Seiren.global.config.S3Service;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "녹음 API")
public class RecordController {

    private final RecordService recordService;
    private final S3Service s3Service; // for test

    @GetMapping("/api/records/recent/{voiceId}")
    public ApiResult<?> getCurrentVoiceRecentScriptId(HttpServletRequest request,
            @PathVariable Long voiceId) {
        return ApiUtils.success(recordService.getRecentScriptId(request, voiceId));
    }

    @GetMapping("/api/records/count/{voiceId}")
    public ApiResult<?> getRecordsCount(HttpServletRequest request, @PathVariable Long voiceId) {
        return ApiUtils.success(recordService.getRecordsCount(request, voiceId));
    }

    @PostMapping(value = "/api/records", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResult<?> addRecord(HttpServletRequest request, @RequestParam Long voiceId,
            @RequestParam Long scriptId,
            @RequestPart MultipartFile file) {
        recordService.insertRecord(request, voiceId, scriptId, file);
        return ApiUtils.success("녹음 파일 저장하였습니다.");
    }

    @PostMapping(value = "/api/inputVoiceFileTest", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    // 테스트 데이터 수동 추가
    public ApiResult<?> inputVoiceFileTest(HttpServletRequest request, @RequestParam Long voiceId,
            @RequestParam Long scriptId,
            @RequestPart MultipartFile file) {
        recordService.insertRecordTest(request, voiceId, scriptId,
                s3Service.uploadWavFileManual(voiceId, file));
        return ApiUtils.success("녹음 파일 추가 완료");
    }
}
