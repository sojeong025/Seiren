package ssafy.e105.Seiren.domain.notify.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.notify.service.NotifyService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class NotifyController {

    private final NotifyService notifyService;

    @GetMapping("/api/notifies")
    public ApiResult<?> getNotifies(HttpServletRequest request) {
        return ApiUtils.success(notifyService.getNotifyList(request));
    }
}
