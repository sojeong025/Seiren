package ssafy.e105.Seiren.domain.voice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.ScriptRequest;
import ssafy.e105.Seiren.domain.voice.service.ScriptService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class ScriptController {

    private final ScriptService scriptService;
    private final UserService userService;

    @GetMapping("/api/scripts/{scriptId}")
    public ApiResult<?> getNextScript(@PathVariable Long scriptId) {
        return ApiUtils.success(scriptService.getNextScript(scriptId));
    }

    @PostMapping("/api/scripts")
    public ApiResult<?> addScripts(String script) {
        scriptService.insertScript(script);
        return ApiUtils.success("스크립트 추가 완료");
    }

    @PutMapping("/api/scripts")
    public ApiResult<?> updateScripts(@RequestBody ScriptRequest scriptRequest) {
        scriptService.updateScript(scriptRequest);
        return ApiUtils.success("스크립트 수정 완료");
    }

    @DeleteMapping("/api/scripts/{scriptId}")
    public ApiResult<?> deleteScripts(@PathVariable Long scriptId) {
        scriptService.deleteScript(scriptId);
        return ApiUtils.success("스크립트 삭제 완료");
    }
}
