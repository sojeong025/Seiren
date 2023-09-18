package ssafy.e105.Seiren.domain.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VoiceUpdateDto {

    private Long voiceId;
    private String voiceTitle;
    private String memo;
    private String voiceAvatarUrl;

    public VoiceUpdateDto(Voice voice) {
        this.voiceId = voice.getVoiceId();
        this.voiceTitle = voice.getVoiceTitle();
        this.memo = voice.getMemo();
        this.voiceAvatarUrl = voice.getVoiceAvatarUrl();
    }
}
