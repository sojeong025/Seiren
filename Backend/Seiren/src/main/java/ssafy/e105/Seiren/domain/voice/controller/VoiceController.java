package ssafy.e105.Seiren.domain.voice.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class VoiceController {
    private final VoiceService voiceService;
    @GetMapping("/voice/voices")
    public void voiceList(){

    }

    @PostMapping("/voice/voices")
    public ApiResult<?> addVoice(HttpServletRequest request){
        return ApiUtils.success(voiceService.addVoice(request));
    }

    @PutMapping("/voice/voices")
    public void modifyVoiceInfo(){

    }

    @DeleteMapping("/voice/voices")
    public void deleteVoice(){

    }
}
