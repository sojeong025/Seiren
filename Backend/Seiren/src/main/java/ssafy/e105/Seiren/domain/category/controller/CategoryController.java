package ssafy.e105.Seiren.domain.category.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ssafy.e105.Seiren.domain.category.dto.CategoryCreateRequest;
import ssafy.e105.Seiren.domain.category.dto.CategoryDto;
import ssafy.e105.Seiren.domain.category.service.CategoryService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@Tag(name = "카테고리 api")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "모든 카테고리 조회")
    @GetMapping("/all")
    public ApiResult readAll(HttpServletRequest request){
        return ApiUtils.success(categoryService.readAll());
    }

    @Operation(summary = "카테고리 처음 생성")
    @PostMapping("/start")
    public ApiResult createCategoryFirst(){
        categoryService.createFirst();
        return ApiUtils.success(true);
    }

    @Operation(summary = "카테고리 추가")
    @PostMapping("/regist")
    public ApiResult createCategory(@RequestBody @Valid CategoryCreateRequest req){
        categoryService.createCategory(req);
        return ApiUtils.success(true);
    }
}
