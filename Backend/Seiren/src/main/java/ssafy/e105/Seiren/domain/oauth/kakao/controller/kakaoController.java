package ssafy.e105.Seiren.domain.oauth.kakao.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;
import ssafy.e105.Seiren.domain.oauth.kakao.dto.KakaoRequest;
import ssafy.e105.Seiren.global.common.BaseResponse;
import ssafy.e105.Seiren.domain.oauth.kakao.service.KakaoService;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

import java.nio.charset.StandardCharsets;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.LOGIN_ERROR;

@RestController
@RequestMapping(value = "/api/login/oauth2", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "OAUTH2.0 API")
public class kakaoController {

    private final KakaoService kakaoService;


    @Operation(summary = "kakaologin")
    @PostMapping("/code/kakao")
    public ApiResult kakaoOauth(HttpServletResponse response
            , @RequestBody @Valid KakaoRequest request
//            , @PathVariable("registrationId") String registrationId
    ){
        try{
//            TokenDto tokenDto = kakaoService.getKakaoInfo(code);
//            response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:3000/redirect")
//                    .queryParam("accessToken", "Bearer "+tokenDto.getAccessToken())
//                    .queryParam("refreshToken", "Bearer " + tokenDto.getRefreshToken())
//                    .build()
//                    .encode(StandardCharsets.UTF_8)
//                    .toUriString());
//
//            return BaseResponse.success(tokenDto);
            return ApiUtils.success(kakaoService.getUserInfoWithToken(request.getAccesstoken()));
        }catch (Exception e){
            e.printStackTrace();
            return ApiUtils.error(new ApiError(LOGIN_ERROR.getMessage(), LOGIN_ERROR.getCode()));
        }

    }
}
