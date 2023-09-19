package ssafy.e105.Seiren.domain.voice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import ssafy.e105.Seiren.domain.product.dto.ProductUpdateDto;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.voice.dto.VoiceUpdateDto;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Voice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voiceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Voice parent;
    private String voiceTitle;
    private String memo;
    private String voiceAvatarUrl;
    private String glowModelUrl;
    private String hifiModelUrl;
    @UpdateTimestamp
    private LocalDateTime createdAt;
    @Column(nullable = false)
    @Builder.Default
    private Boolean isDelete = false;
    @Builder.Default
    private Integer state = 0;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public static Voice toEntity(User user) {
        return Voice.builder()
                .user(user)
                .build();
    }

    public void update(String memo) {
        this.memo = memo;
    }

    public void update(Integer state) {
        this.state = state;
    }

    public void update(VoiceUpdateDto voiceUpdateDto) {
        this.voiceTitle = voiceUpdateDto.getVoiceTitle();
        this.voiceAvatarUrl = voiceUpdateDto.getVoiceAvatarUrl();
        this.memo = voiceUpdateDto.getMemo();
    }

    public void update(ProductUpdateDto productUpdateDto) {
        this.voiceAvatarUrl = productUpdateDto.getVoiceAvatarUrl();
    }

    public void delete() {
        this.isDelete = true;
    }
}
