package ssafy.e105.Seiren.domain.voice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.entity.Script;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;

@RestController
@RequiredArgsConstructor
public class VoiceController {
    private final VoiceService voiceService;
    @GetMapping("voices")
    public void voiceList(){

    }

    @PostMapping("voices")
    public void addVoice(){

    }

    @PutMapping("voices")
    public void modifyVoiceInfo(){

    }

    @DeleteMapping("voices")
    public void deleteVoice(){

    }
}
