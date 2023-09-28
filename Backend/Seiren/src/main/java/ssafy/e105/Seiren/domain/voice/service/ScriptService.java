package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_SCRIPT;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NO_MORE_SCRIPT;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.SCRIPT_DELETE_ERROR;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.SCRIPT_INSERT_ERROR;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.voice.dto.ScriptRequest;
import ssafy.e105.Seiren.domain.voice.dto.ScriptResponse;
import ssafy.e105.Seiren.domain.voice.entity.Script;
import ssafy.e105.Seiren.domain.voice.repository.ScriptRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScriptService {

    private final ScriptRepository scriptRepository;

    public ScriptResponse getNextScript(Long scriptId) {
        Script script = scriptRepository.findTopByScriptIdGreaterThanAndIsDeleteFalseOrderByScriptIdAsc(
                        scriptId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NO_MORE_SCRIPT.getMessage(), NO_MORE_SCRIPT.getCode())));
        return new ScriptResponse(script);
    }

    public String getScriptText(Long scriptId) {
        return scriptRepository.findById(scriptId).orElseThrow().getText();
    }

    @Transactional
    public void insertScript(String script) {
        try {
            scriptRepository.save(Script.builder().text(script).build());
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(SCRIPT_INSERT_ERROR.getMessage(), SCRIPT_INSERT_ERROR.getCode()));
        }
    }

    @Transactional
    public void updateScript(ScriptRequest scriptRequest) {
        Script script = getScript(scriptRequest.getScriptId());
        try {
            script.delete(true);
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(SCRIPT_DELETE_ERROR.getMessage(), SCRIPT_DELETE_ERROR.getCode()));
        }

        insertScript(scriptRequest.getScript());
    }

    @Transactional
    public void deleteScript(Long scriptId) {
        Script script = scriptRepository.findById(scriptId).orElseThrow();
        script.delete(true);
    }

    public Script getScript(Long scriptId) {
        return scriptRepository.findById(scriptId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_SCRIPT.getMessage(), NOT_EXIST_SCRIPT.getCode())));
    }

    public void creteScriptList(String filePath) {
        List<String> sentences = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split("\\|");  // '|' 문자로 분할
                if (parts.length >= 4) {  // 최소 4개 필드가 있어야 함
                    String sentence = parts[1].trim();  // 두 번째 필드(인덱스 1) 추출 및 공백 제거
                    sentences.add(sentence);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 1/1 세트가 0~1040까지라 그 정도만 먼저 저장
        for (int i = 0; i <= 1040; i++) {
            System.out.println(i + " : " + sentences.get(i));
            scriptRepository.save(Script.builder().text(sentences.get(i)).build());
        }
    }
}
