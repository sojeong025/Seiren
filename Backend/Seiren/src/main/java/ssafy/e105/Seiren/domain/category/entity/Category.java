package ssafy.e105.Seiren.domain.category.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    public Category(String name, Category parent){
        this.name = name;
        this.parent = parent;
    }

    public static Category toEntity(String name, Category parent){
        return Category.builder()
                .name(name)
                .parent(parent)
                .build();
    }
}
