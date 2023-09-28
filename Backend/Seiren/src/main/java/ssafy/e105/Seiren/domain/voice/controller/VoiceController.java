package ssafy.e105.Seiren.domain.voice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.dto.VoiceInsertUpdateDto;
import ssafy.e105.Seiren.domain.voice.dto.VoiceMemoUpdateRequest;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "음성 API")
public class VoiceController {

    private final VoiceService voiceService;

    // 녹음 페이지 처음 접속 시 호출
    @GetMapping("/api/progressingVoices")
    public ApiResult<?> getProgressVoiceId(HttpServletRequest request) {
        return ApiUtils.success(
                voiceService.getCurrentVoiceId(request));
    }

    @GetMapping("/api/voices")
    public ApiResult<?> getVoiceList(HttpServletRequest request) {
        return ApiUtils.success(voiceService.getVoiceList(request));
    }

    @GetMapping("/api/voices/{voiceId}")
    public ApiResult<?> getVoiceDetail(HttpServletRequest request, @PathVariable Long voiceId) {
        return ApiUtils.success(voiceService.getVoiceDetail(request, voiceId));
    }

    @PostMapping("/api/voices")
    public ApiResult<?> addVoice(HttpServletRequest request,
            @RequestBody VoiceInsertUpdateDto voiceDto) {
        return ApiUtils.success(
                voiceService.addVoice(request, voiceDto)); // 현재 녹음중인 음성(0, 1)이 없으면 음성 생성 호출 가능
    }

    @PutMapping("/api/voices")
    public ApiResult<?> modifyVoiceInfo(HttpServletRequest request,
            @RequestBody VoiceInsertUpdateDto voiceInsertUpdateDto) {
        voiceService.updateVoice(request, voiceInsertUpdateDto);
        return ApiUtils.success("목소리 정보 수정 완료");
    }

    @PutMapping("/api/voices/memo")
    public ApiResult<?> modifyVoiceMemo(HttpServletRequest request,
            @RequestBody VoiceMemoUpdateRequest voiceMemoUpdateRequest) {
        voiceService.updateVoiceMemo(request, voiceMemoUpdateRequest);
        return ApiUtils.success("목소리 메모 수정 완료");
    }

    @GetMapping("/api/voices/zip")
    public ApiResult<?> createAiModel(HttpServletRequest request, @RequestParam Long voiceId) {
        return ApiUtils.success(voiceService.getZipUrl(request, voiceId));
    }

    @DeleteMapping("/api/voices/{voiceId}")
    public ApiResult<?> deleteVoice(HttpServletRequest request, @PathVariable Long voiceId) {
        voiceService.deleteVoice(request, voiceId);
        return ApiUtils.success("목소리 삭제 상태로 변경");
    }
}
