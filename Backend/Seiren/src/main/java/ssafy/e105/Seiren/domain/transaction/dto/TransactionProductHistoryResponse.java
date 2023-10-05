package ssafy.e105.Seiren.domain.transaction.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.transaction.entity.UseHistory;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionProductHistoryResponse {

    /**
     * 입력했던 텍스트
     */
    private String text;
    /**
     * mp3파일 url
     */
    private String mp3Url;

    /**
     * 생성 일자
     */
    private LocalDateTime createAt;

    /**
     * toDto
     */
    public static TransactionProductHistoryResponse toDto(UseHistory useHistory) {
        return TransactionProductHistoryResponse.builder()
                .text(useHistory.getText())
                .mp3Url(useHistory.getFileUrl())
                .createAt(useHistory.getCreateAt())
                .build();
    }

}
