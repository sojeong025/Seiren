package ssafy.e105.Seiren.domain.voice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

@Builder
@Getter
@Entity
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

//    private Voice voice;
//    private Script script;
    private String recordUrl;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
