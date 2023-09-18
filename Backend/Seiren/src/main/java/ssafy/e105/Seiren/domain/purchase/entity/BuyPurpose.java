package ssafy.e105.Seiren.domain.purchase.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BuyPurpose {

    @Id
    @GeneratedValue
    @Column(name = "buy_purpose_id")
    private Long id;

    private String purposeName;
}
