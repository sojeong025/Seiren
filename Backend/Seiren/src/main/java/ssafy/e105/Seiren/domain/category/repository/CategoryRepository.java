package ssafy.e105.Seiren.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.e105.Seiren.domain.category.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c from Category c LEFT JOIN c.parent p order by p.id ASC nulls first, c.id ASC")
    List<Category> findAllOrderByParentIdAscNullsFirstCategoryIdAsc();

    Optional<Category> findById(Long aLong);
}
