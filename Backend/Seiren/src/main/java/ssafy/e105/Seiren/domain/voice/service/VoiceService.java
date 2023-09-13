package ssafy.e105.Seiren.domain.voice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;

@Service
@RequiredArgsConstructor
public class VoiceService {
    private final VoiceRepository voiceRepository;


}
