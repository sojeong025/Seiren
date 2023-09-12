package ssafy.e105.Seiren.domain.oauth.kakao.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import ssafy.e105.Seiren.common.BaseResponse;
import ssafy.e105.Seiren.domain.oauth.kakao.service.KakaoService;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/login/oauth2", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "OAUTH2.0 API")
public class kakaocontroller {

    private final KakaoService kakaoService;

    @GetMapping("/code/{registrationId}")
    public BaseResponse kakaoOauth(HttpServletResponse response
            , @RequestParam("code") String code
            , @PathVariable("registrationId") String registrationId
    ){
        try{
            TokenDto tokenDto = kakaoService.getKakaoInfo(code);
            response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:8080")
                    .queryParam("accessToken", "Bearer "+tokenDto.getAccessToken())
                    .queryParam("refreshToken", "Bearer " + tokenDto.getRefreshToken())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());

            return BaseResponse.success(tokenDto);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("OAUTH로그인에 실패하였습니다.");
        }
    }
}