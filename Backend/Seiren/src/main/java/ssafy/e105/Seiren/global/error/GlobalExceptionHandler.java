package ssafy.e105.Seiren.global.error;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    @ResponseBody
    public ApiResult<?> handleAllExceptions(BaseException be){
        return ApiUtils.error(be.getApiError());
    }

    // Custom Exception에 따른 추가적인 handler 필요
}
