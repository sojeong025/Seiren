package ssafy.e105.Seiren.domain.voice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Script {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scriptId;

    private String text;

    //    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE", nullable = false)
    @Column(nullable = false)
    @Builder.Default
    private Boolean isDelete = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public void delete(Boolean isDelete) {
        this.isDelete = isDelete;
    }
}
