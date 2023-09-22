package ssafy.e105.Seiren.domain.transaction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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
    public static UseHistory toDto(Transaction transaction, String text){
        return UseHistory.builder()
                .transaction(transaction)
                .text(text)
                .characterCount(text.length())
                .createAt(LocalDateTime.now())
                .build();
    }
}
