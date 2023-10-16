package ssafy.e105.Seiren.domain.voice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.dto.ScriptRequest;
import ssafy.e105.Seiren.domain.voice.service.ScriptService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "스크립트 API")
public class ScriptController {

    private final ScriptService scriptService;

    @Operation(summary = "다음 script")
    @GetMapping("/api/nextScripts/{scriptId}")
    public ApiResult<?> getNextScript(@PathVariable Long scriptId) {
        return ApiUtils.success(scriptService.getNextScript(scriptId));
    }

    @Operation(summary = "script 추가")
    @PostMapping("/api/scripts")
    public ApiResult<?> addScripts(String script) {
        scriptService.insertScript(script);
        return ApiUtils.success("스크립트 추가 완료");
    }

    @Operation(summary = "script 수정")
    @PutMapping("/api/scripts")
    public ApiResult<?> updateScripts(@RequestBody ScriptRequest scriptRequest) {
        scriptService.updateScript(scriptRequest);
        return ApiUtils.success("스크립트 수정 완료");
    }

    @Operation(summary = "script 삭제")
    @DeleteMapping("/api/scripts/{scriptId}")
    public ApiResult<?> deleteScripts(@PathVariable Long scriptId) {
        scriptService.deleteScript(scriptId);
        return ApiUtils.success("스크립트 삭제 완료");
    }

    @Operation(summary = "txt 파일로 script 생성")
    @PostMapping("/api/script/file")
    public ApiResult<?> createScripts(@RequestParam String filePath) {
        scriptService.creteScriptList(filePath);
        return ApiUtils.success("성공적으로 스크립트 객제들을 생성했습니다");
    }
}
