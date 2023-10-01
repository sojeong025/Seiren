package ssafy.e105.Seiren.domain.voice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoiceStateDto {

    private int oneOrLessCount;
    private int twoOrMoreCount;

    public VoiceStateDto(int oneOrLessCount, int twoOrMoreCount) {
        this.oneOrLessCount = oneOrLessCount;
        this.twoOrMoreCount = twoOrMoreCount;
    }
}
