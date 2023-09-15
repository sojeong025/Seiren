package ssafy.e105.Seiren.domain.user.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;
import ssafy.e105.Seiren.domain.product.entity.Wish;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterReqDto;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@SQLDelete(sql = "UPDATE users SET is_delete = true where user_id = ?")
// delete 쿼리가 발생하면 해당 쿼리가 대신 발생
@Where(clause = "is_delete = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
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

    @OneToMany(mappedBy = "user")
    private List<Wish> wishes = new ArrayList<>();

    /**
     * oauth 회원 가입 로직
     */
    public static User toEntity(String email, String nickname, String profileImg) {
        return User.builder()
                .email(email)
                .nickname(nickname)
                .profileImg(profileImg)
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .build();
    }

    /**
     * 일반 회원가입
     */
    public static User toEntitySwagger(RegisterReqDto reqDto, PasswordEncoder encoder) {
        return User.builder()
                .email(reqDto.getEmail())
                .password(encoder.encode(reqDto.getPassword()))
                .isDelete(false)
                .build();
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}
