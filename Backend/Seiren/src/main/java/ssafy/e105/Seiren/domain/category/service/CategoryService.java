package ssafy.e105.Seiren.domain.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.category.dto.CategoryCreateRequest;
import ssafy.e105.Seiren.domain.category.dto.CategoryDto;
import ssafy.e105.Seiren.domain.category.entity.Category;
import ssafy.e105.Seiren.domain.category.repository.CategoryRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

import java.util.List;
import java.util.Optional;

import static ssafy.e105.Seiren.domain.category.exception.CategoryErrorCode.CATEGORY_CREATE_ERROR;
import static ssafy.e105.Seiren.domain.category.exception.CategoryErrorCode.CATEGORY_READ_ERROR;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> readAll(){
        try{
            List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
            return CategoryDto.toDtoList(categories);
        }catch (Exception e){
            e.printStackTrace();
            throw new BaseException(new ApiError(CATEGORY_READ_ERROR.getMessage(), CATEGORY_READ_ERROR.getCode()));
        }

    }

    @Transactional
    public void createFirst(){
        Category category = new Category("default", null);
        categoryRepository.save(category);
    }
    @Transactional
    public void createCategory(CategoryCreateRequest req){
       try{
           Category parent = Optional.ofNullable(req.getParentId())
                   .map(id -> categoryRepository.findById(id).orElseThrow(NullPointerException::new))
                   .orElse(null);
           categoryRepository.save(new Category(req.getName(), parent));
       }catch (Exception e){
           e.printStackTrace();
           throw new BaseException(new ApiError(CATEGORY_CREATE_ERROR.getMessage(), CATEGORY_CREATE_ERROR.getCode()));
       }
    }
}
