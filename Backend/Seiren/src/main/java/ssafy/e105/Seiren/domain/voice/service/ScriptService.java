package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_SCRIPT;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.SCRIPT_DELETE_ERROR;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.SCRIPT_INSERT_ERROR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.voice.dto.ScriptRequest;
import ssafy.e105.Seiren.domain.voice.entity.Script;
import ssafy.e105.Seiren.domain.voice.repository.ScriptRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class ScriptService {
    private final ScriptRepository scriptRepository;

    public void insertScript(String script){
        try {
            scriptRepository.save(Script.builder().script(script).build());
        }catch(Exception e){
            throw new BaseException(new ApiError(SCRIPT_INSERT_ERROR.getMessage(), SCRIPT_INSERT_ERROR.getCode()));
        }
    }

    @Transactional
    public void updateScript(ScriptRequest scriptRequest){
        Script script = scriptRepository.findById(scriptRequest.getScriptId())
                .orElseThrow(()->new BaseException(new ApiError(NOT_EXIST_SCRIPT.getMessage(), NOT_EXIST_SCRIPT.getCode())));
        try{
            script.modifyDelete(true);
        }catch (Exception e){
            throw new BaseException(new ApiError(SCRIPT_DELETE_ERROR.getMessage(),SCRIPT_DELETE_ERROR.getCode()));
        }

        insertScript(script.getScript());
    }
}
