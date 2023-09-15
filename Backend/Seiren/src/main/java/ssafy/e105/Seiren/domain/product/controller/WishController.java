package ssafy.e105.Seiren.domain.product.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.product.service.WishService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequestMapping("/api/wish")
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;

    @PostMapping("{productId}")
    public ApiResult<?> createWish(HttpServletRequest request, @PathVariable Long productId) {
        wishService.addWish(request, productId);
        return ApiUtils.success("성공적으로 찜 추가하였습니다");
    }
}
