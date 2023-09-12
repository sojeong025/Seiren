package ssafy.e105.Seiren.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    private String password;

    /**
     * oauth 회원 가입 로직
     */
    public static User fromEntity(String email, String nickname, String profileImg, PasswordEncoder encoder){
        return User.builder()
                .email(email)
                .nickname(nickname)
                .profileImg(profileImg)
                .createAt(LocalDateTime.now())
                .password(encoder.encode(email))
                .isDelete(false)
                .build();
    }
}
