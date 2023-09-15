package ssafy.e105.Seiren.domain.voice.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;

@RestController
@RequiredArgsConstructor
public class VoiceController {
    private final VoiceService voiceService;
    @GetMapping("/voice/voices")
    public void voiceList(){

    }

    @PostMapping("/voice/voices")
    public void addVoice(HttpServletRequest request){

    }

    @PutMapping("/voice/voices")
    public void modifyVoiceInfo(){

    }

    @DeleteMapping("/voice/voices")
    public void deleteVoice(){

    }
}
