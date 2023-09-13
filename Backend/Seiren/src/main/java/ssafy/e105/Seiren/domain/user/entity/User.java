package ssafy.e105.Seiren.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String email;

    private String nickname;

    private String profileImg;

    private Boolean isDelete;

    private LocalDateTime createAt;

    /**
     * oauth 회원 가입 로직
     */
    public static User fromEntity(String email, String nickname, String profileImg){
        return User.builder()
                .email(email)
                .nickname(nickname)
                .profileImg(profileImg)
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .build();
    }
}
