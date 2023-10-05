package ssafy.e105.Seiren.domain.user.dto.register;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterReqDto {

    @Schema(description = "회원 이메일", example = "cute@cute.com")
    private String email;

    @Schema(description = "회원 비밀번호", example = "cutecute")
    private String password;
}
