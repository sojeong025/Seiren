package ssafy.e105.Seiren.domain.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.category.entity.Category;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    @Schema(description = "아이디값", example="23")
    private Long id;

    @Schema(description = "카테고리 이름", example = "분위기")
    private String name;

    @Schema(description = "하위 카테고리", example = "리스트")
    private List<CategoryDto> children;

    public static List<CategoryDto> toDtoList(List<Category> categories){
        CategoryHelper helper = CategoryHelper.newInstance(
                categories,
                c -> new CategoryDto(c.getId(), c.getName(), new ArrayList<>()),
                c -> c.getParent(),
                c -> c.getId(),
                d -> d.getChildren());
        return helper.convert();
    }

}
