package ssafy.e105.Seiren.domain.voice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import ssafy.e105.Seiren.domain.user.entity.User;

@Builder
@Getter
@Entity
public class Voice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voiceId;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="parent_id")
    private Voice parent;
    private String voiceTitle;
    private String memo;
    private String voiceAvatarUrl;
    private String glowModelUrl;
    private String hifiModelUrl;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(nullable = false)
    @Builder.Default
    private Boolean isDelete=false;

    public static Voice toEntity(User user){
        return Voice.builder()
                .user(user)
                .build();
    }

    public void modifyMemo(String memo){
        this.memo = memo;
    }

    public void modifyInformation(String title, String url, String memo){
        this.voiceTitle = title;
        this.voiceAvatarUrl = url;
        this.memo = memo;
    }
}
