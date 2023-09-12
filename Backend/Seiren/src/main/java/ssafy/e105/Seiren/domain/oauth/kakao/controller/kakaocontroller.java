package ssafy.e105.Seiren.domain.oauth.kakao.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ssafy.e105.Seiren.common.BaseResponse;
import ssafy.e105.Seiren.domain.oauth.kakao.service.KakaoService;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;

@RestController
@RequestMapping(value = "/api/login/oauth2", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "OAUTH2.0 API")
public class kakaocontroller {
    private KakaoService kakaoService;

    @GetMapping("/code/{registrationId}")
    public BaseResponse kakaoOauth(HttpServletResponse response
            , @RequestParam("code") String code
            , @PathVariable("registrationId") String registrationId
    ){
        try{
//            TokenDto tokenDto = kakaoService.
            System.out.println("code = " + code);
            return BaseResponse.success("success");
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("OAUTH로그인에 실패하였습니다.");
        }
    }
}
