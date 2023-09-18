package ssafy.e105.Seiren.domain.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.voice.entity.Script;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ScriptResponse {

    private Long scriptId;
    private String script;

    public ScriptResponse(Script script) {
        this.scriptId = script.getScriptId();
        this.script = script.getText();
    }
}
