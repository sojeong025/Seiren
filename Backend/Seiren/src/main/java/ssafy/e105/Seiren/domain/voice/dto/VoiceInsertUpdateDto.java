package ssafy.e105.Seiren.domain.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VoiceInsertUpdateDto {

    private Long voiceId;
    private String voiceTitle;
    private String memo;
    private String voiceAvatarUrl;
    private Integer state;
    private Long productId;

    public VoiceInsertUpdateDto(Voice voice, Long productId) {
        this.voiceId = voice.getVoiceId();
        this.voiceTitle = voice.getVoiceTitle();
        this.memo = voice.getMemo();
        this.voiceAvatarUrl = voice.getVoiceAvatarUrl();
        this.state = voice.getState();
        this.productId = productId;
    }
}
