package ssafy.e105.Seiren.domain.voice.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoiceDto {

    private Long voiceId;
    private String voiceTitle;
    private String voiceAvatarUrl;
    private LocalDateTime createdAt;
    private Integer state;

    public VoiceDto(Voice voice) {
        this.voiceId = voice.getVoiceId();
        this.createdAt = voice.getCreatedAt();
        this.state = voice.getState();
    }
}
