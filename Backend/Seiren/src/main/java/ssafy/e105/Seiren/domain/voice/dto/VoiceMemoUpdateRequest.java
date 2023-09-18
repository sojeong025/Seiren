package ssafy.e105.Seiren.domain.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VoiceMemoUpdateRequest {

    private Long voiceId;
    private String memo;
}
