package ssafy.e105.Seiren.domain.oauth.kakao.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KakaoRequest {

    @Schema(description = "카카오 로그인 엑세스 토큰", example = "qwr")
    private String accesstoken;
}
