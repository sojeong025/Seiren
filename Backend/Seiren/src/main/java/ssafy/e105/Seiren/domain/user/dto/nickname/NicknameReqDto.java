package ssafy.e105.Seiren.domain.user.dto.nickname;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NicknameReqDto {

    @Schema(description = "닉네임 수정", example = "짱구")
    private String nickname;
}
