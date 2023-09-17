package ssafy.e105.Seiren.domain.voice.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.dto.VoiceUpdateDto;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class VoiceController {

    private final VoiceService voiceService;

    @GetMapping("/voice/voices")
    public ApiResult<?> voiceList(HttpServletRequest request) {
        return ApiUtils.success(voiceService.getVoiceList(request));
    }

    @PostMapping("/voice/voices")
    public ApiResult<?> addVoice(HttpServletRequest request) {
        return ApiUtils.success(voiceService.addVoice(request));
    }

    @PutMapping("/voice/voices")
    public ApiResult<?> modifyVoiceInfo(HttpServletRequest request,
            @RequestBody VoiceUpdateDto voiceUpdateDto) {
        voiceService.updateVoice(request, voiceUpdateDto);
        return ApiUtils.success("목소리 정보 수정 완료");
    }

    @PutMapping("/voice/voices/memo")
    public ApiResult<?> modifyVoiceMemo(HttpServletRequest request,
            @RequestBody VoiceUpdateDto voiceUpdateDto) {
        voiceService.updateVoiceMemo(request, voiceUpdateDto);
        return ApiUtils.success("목소리 메모 수정 완료");
    }

    @DeleteMapping("/voice/voices/{voiceId}")
    public ApiResult<?> deleteVoice(HttpServletRequest request, @PathVariable Long voiceId) {
        voiceService.deleteVoice(request, voiceId);
        return ApiUtils.success("목소리 삭제 상태로 변경");
    }
}
