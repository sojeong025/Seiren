package ssafy.e105.Seiren.global.error.type;

import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.global.utils.ApiError;

@Getter
@NoArgsConstructor
public class BaseException extends RuntimeException {
    private ApiError apiError;

    public BaseException(String message){
        super(message);
    }

    public BaseException(ApiError apiError){
        this.apiError = apiError;
    }

}
