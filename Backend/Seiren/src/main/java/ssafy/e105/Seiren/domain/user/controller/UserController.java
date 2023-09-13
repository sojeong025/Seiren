package ssafy.e105.Seiren.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.user.dto.login.LoginReqDto;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterReqDto;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.global.common.BaseResponse;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "회원 API")
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원 가입")
    @PostMapping("/signup")
    public BaseResponse signup(
            @RequestBody @Valid RegisterReqDto registerReqDto
    ){
        try{
            return BaseResponse.success(userService.signup(registerReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("회원 가입 실패");
        }
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public BaseResponse login(
            @RequestBody @Valid LoginReqDto loginReqDto,
            HttpServletResponse response
            ){
        try{
            return BaseResponse.success(userService);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("로그인 실패");
        }
    }



}
