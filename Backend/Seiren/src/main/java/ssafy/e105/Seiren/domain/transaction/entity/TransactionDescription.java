package ssafy.e105.Seiren.domain.transaction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TransactionDescription {

    @Id
    @GeneratedValue
    @Column(name = "transaction_description_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purpose_id")
    private Purpose purpose;

    private String productTitle;

    private String summary;

    private Double price;

    private LocalDateTime buyDate;

    private int buyLetterCount;





}