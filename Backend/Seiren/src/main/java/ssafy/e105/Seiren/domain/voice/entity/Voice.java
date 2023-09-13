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
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.ManyToAny;
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
    private String modelFileUrl;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private Boolean isDelete;

    public void modifyMemo(String memo){
        this.memo = memo;
    }

    public void modifyInformation(String title, String url, String memo){
        this.voiceTitle = title;
        this.voiceAvatarUrl = url;
        this.memo = memo;
    }
}
