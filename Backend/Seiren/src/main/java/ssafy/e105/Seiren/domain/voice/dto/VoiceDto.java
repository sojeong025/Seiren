package ssafy.e105.Seiren.domain.voice.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class VoiceDto {

    private Long voiceId;
    private String voiceTitle;
    private String voiceAvatarUrl;
    private LocalDateTime createdAt;
    private Integer state;
}
