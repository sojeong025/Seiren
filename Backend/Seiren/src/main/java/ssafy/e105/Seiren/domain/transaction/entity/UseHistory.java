package ssafy.e105.Seiren.domain.transaction.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UseHistory {

    @Id
    @GeneratedValue
    @Column(name = "use_history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    private String text;

    private String fileUrl;

    private int characterCount;

    private LocalDateTime createAt;

    /**
     * DTO 만들기
     */
    public static UseHistory toDto(Transaction transaction, String text) {
        return UseHistory.builder()
                .transaction(transaction)
                .text(text)
                .characterCount(text.length())
                .createAt(LocalDateTime.now())
                .build();
    }
}
