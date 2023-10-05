package ssafy.e105.Seiren.domain.transaction.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.e105.Seiren.domain.transaction.dto.PurposeCreateRequest;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Purpose {

    @Id
    @GeneratedValue
    @Column(name = "purpose_id")
    private Long id;

    private String purposeName;

    public static Purpose toEntity(PurposeCreateRequest purposeCreateDto) {
        return Purpose.builder()
                .purposeName(purposeCreateDto.getPurposeName())
                .build();
    }
}
