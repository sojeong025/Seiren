package ssafy.e105.Seiren.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {

    private String nickname;
    private String profileImg;
    private Long userId;
    private Integer newNotifyCount;
}
