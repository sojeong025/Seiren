package ssafy.e105.Seiren.domain.voice.controller;

import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "녹음중, 학습 중 또는 학습 완료 상태의 가장 최신 voiceId ")
    @GetMapping("/api/progressingVoices")
    public ApiResult<?> getProgressVoiceId(HttpServletRequest request) {
        return ApiUtils.success(
                voiceService.getCurrentVoiceId(request));
    }

    @Operation(summary = "나의 voice 리스트")
    @GetMapping("/api/voices")
    public ApiResult<?> getVoiceList(HttpServletRequest request) {
        return ApiUtils.success(voiceService.getVoiceList(request));
    }

    @Operation(summary = "voice 상세 정보")
    @GetMapping("/api/voices/{voiceId}")
    public ApiResult<?> getVoiceDetail(HttpServletRequest request, @PathVariable Long voiceId) {
        return ApiUtils.success(voiceService.getVoiceDetail(request, voiceId));
    }

    @Operation(summary = "voice 생성")
    @PostMapping("/api/voices")
    public ApiResult<?> addVoice(HttpServletRequest request,
            @RequestBody VoiceInsertUpdateDto voiceDto) {
        return ApiUtils.success(
                voiceService.addVoice(request, voiceDto)); // 현재 녹음중인 음성(0, 1)이 없으면 음성 생성 호출 가능
    }

    @Operation(summary = "voice 정보 수정")
    @PutMapping("/api/voices")
    public ApiResult<?> modifyVoiceInfo(HttpServletRequest request,
            @RequestBody VoiceInsertUpdateDto voiceInsertUpdateDto) {
        voiceService.updateVoice(request, voiceInsertUpdateDto);
        return ApiUtils.success("목소리 정보 수정 완료");
    }

    @Operation(summary = "voice 메모 수정")
    @PutMapping("/api/voices/memo")
    public ApiResult<?> modifyVoiceMemo(HttpServletRequest request,
            @RequestBody VoiceMemoUpdateRequest voiceMemoUpdateRequest) {
        voiceService.updateVoiceMemo(request, voiceMemoUpdateRequest);
        return ApiUtils.success("목소리 메모 수정 완료");
    }

    @Operation(summary = "voiceId zip파일 생성")
    @GetMapping("/api/voices/zip")
    public ApiResult<?> createAiModel(HttpServletRequest request, @RequestParam Long voiceId) {
        return ApiUtils.success(voiceService.getZipUrl(request, voiceId));
    }

    @Operation(summary = "voice 상태 2로 수정")
    @PutMapping("/api/voices/state")
    public ApiResult<?> modifyVoiceState2(@RequestParam Long voiceId) { //HttpServletRequest request
        voiceService.updateVoiceState2(voiceId);
        return ApiUtils.success("voice state 1에서 2로 변경");
    }

    @Operation(summary = "voice 삭제")
    @DeleteMapping("/api/voices/{voiceId}")
    public ApiResult<?> deleteVoice(HttpServletRequest request, @PathVariable Long voiceId) {
        voiceService.deleteVoice(request, voiceId);
        return ApiUtils.success("목소리 삭제 상태로 변경");
    }

    @Operation(summary = "내 목소리 상태별 개수")
    @GetMapping("/api/state/count")
    public ApiResult<?> getContAboutVoiceState(HttpServletRequest request) {
        return ApiUtils.success(voiceService.getContAboutVoiceState(request));
    }
}
