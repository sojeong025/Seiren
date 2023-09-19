package ssafy.e105.Seiren.domain.product.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.service.WishService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;

    @PostMapping("/api/wish/{productId}")
    public ApiResult<?> createWish(HttpServletRequest request, @PathVariable Long productId) {
        wishService.addWish(request, productId);
        return ApiUtils.success("성공적으로 찜 추가하였습니다");
    }

    @DeleteMapping("/api/wish/{productId}")
    public ApiResult<?> cancleWish(HttpServletRequest request, @PathVariable Long productId) {
        wishService.deleteWish(request, productId);
        return ApiUtils.success("성공적으로 찜 취소하였습니다");
    }

    @GetMapping("/api/wish")
    public ApiResult<?> getAllWish(HttpServletRequest request) {
        return ApiUtils.success(wishService.getAll(request));
    }
}
