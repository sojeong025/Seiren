package ssafy.e105.Seiren.domain.transaction.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductAvailabilityDto {

    private int useAbleCount;
    private int useUnableCount;

    public ProductAvailabilityDto(int useAbleCount, int useUnableCount) {
        this.useAbleCount = useAbleCount;
        this.useUnableCount = useUnableCount;
    }
}
