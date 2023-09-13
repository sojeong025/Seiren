package ssafy.e105.Seiren.domain.user.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.user.dto.login.LoginReqDto;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterReqDto;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterResDto;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public RegisterResDto signup(RegisterReqDto registerReqDto){
        Optional<User> user = userRepository.findByEmail(registerReqDto.getEmail());

        if(!user.isEmpty()) throw new IllegalArgumentException("이미 사용중인 아이디입니다.");

        userRepository.save(User.toEntitySwagger(registerReqDto, passwordEncoder));
        try{
            userRepository.flush();
        }catch (DataIntegrityViolationException e){
            e.printStackTrace();
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        return RegisterResDto.builder()
                .check(true)
                .build();
    }

    /**
     * 로그인 로직
     */
//    public TokenDto login(
//        HttpServletResponse response,
//        LoginReqDto loginReqDto
//    ){
//        try{
//            System.out.println("로그인 시작");
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            loginReqDto.getEmail(),
//                            loginReqDto.getPassword()
//                    )
//            );
//            log.info("로그인 컨트롤러 에러 >>> " + authentication);
//
//        }catch (Exception e){
//            e.printStackTrace();
//            throw new IllegalArgumentException("로그인 에러");
//        }
//
//    }





}
