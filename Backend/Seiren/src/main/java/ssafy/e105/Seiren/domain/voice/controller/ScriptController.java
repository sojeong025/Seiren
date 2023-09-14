package ssafy.e105.Seiren.domain.voice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.voice.dto.ScriptRequest;
import ssafy.e105.Seiren.domain.voice.service.ScriptService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
public class ScriptController {
    private final ScriptService scriptService;

    @GetMapping("scripts")
    public void getScripts(){

    }

    @PostMapping("scripts")
    public ApiResult<?> addScripts(String script){
        scriptService.insertScript(script);
        return ApiUtils.success("스크립트 추가 완료");
    }

    @PutMapping("scripts")
    public ApiResult<?> updateScripts(@RequestBody ScriptRequest scriptRequest){
        scriptService.updateScript(scriptRequest);
        return ApiUtils.success("스크립트 수정 완료");
    }
}
