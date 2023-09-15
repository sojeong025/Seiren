package ssafy.e105.Seiren.domain.voice.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;

@Service
@RequiredArgsConstructor
public class VoiceService {
    private final VoiceRepository voiceRepository;

    public void addVoice(HttpServletRequest request){

    }
}
