package ssafy.e105.Seiren.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileImgRequest {

    @Schema(description = "프로필 사진 수정", example = "업데이트된 사진")
    private String profileImgUrl;
}
