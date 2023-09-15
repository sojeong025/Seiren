package ssafy.e105.Seiren.domain.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryCreateRequest {

    @Schema(description = "카테고리 이름", example = "분위기")
    private String name;

    @Schema(description = "부모 카테고리 id", example = "0")
    private Long parentId;
}
