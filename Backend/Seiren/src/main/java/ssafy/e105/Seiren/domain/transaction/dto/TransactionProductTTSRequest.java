package ssafy.e105.Seiren.domain.transaction.dto;


import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionProductTTSRequest {

    private Long transactionId;

    @Pattern(regexp = "[가-힣]{1,200}", message = "한글로 200글자 이하의 문자열만 가능합니다.")
    private String text;

}
