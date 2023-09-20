package ssafy.e105.Seiren.domain.product.entity;

import java.io.Serializable;
import lombok.Data;

@Data
public class ProductCategoryId implements Serializable {

    private Long product;
    private Long category;

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
