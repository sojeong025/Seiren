package ssafy.e105.Seiren.domain.user.service;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.EXIST_NICKNAME;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.LOGIN_ERROR;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NICKNAME_UNMATCHED_FORMAT;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.REGISTER_ERROR;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.UPDATE_NICKNAME_ERROR;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.UPDATE_PROFILE_IMG_ERROR;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;
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
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.product.service.ProductService;
import ssafy.e105.Seiren.domain.user.dto.ProfileImgRequest;
import ssafy.e105.Seiren.domain.user.dto.UserInfoResponse;
import ssafy.e105.Seiren.domain.user.dto.login.LoginReqDto;
import ssafy.e105.Seiren.domain.user.dto.nickname.NicknameReqDto;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterReqDto;
import ssafy.e105.Seiren.domain.user.dto.register.RegisterResDto;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.domain.voice.service.VoiceService;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

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
    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;

    @Transactional
    public RegisterResDto signup(RegisterReqDto registerReqDto){
        Optional<User> user = userRepository.findByEmail(registerReqDto.getEmail());

        if(!user.isEmpty()) throw new IllegalArgumentException("이미 사용중인 아이디입니다.");

        userRepository.save(User.toEntitySwagger(registerReqDto, passwordEncoder));
        try{
            userRepository.flush();
        }catch (DataIntegrityViolationException e){
            e.printStackTrace();
            throw new BaseException(new ApiError(REGISTER_ERROR.getMessage(), REGISTER_ERROR.getCode()));
        }
        return RegisterResDto.builder()
                .check(true)
                .build();
    }

    /**
     * 로그인 로직
     */
    public TokenDto login(
        HttpServletResponse response,
        LoginReqDto loginReqDto
    ){
        try{
            System.out.println("로그인 시작");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginReqDto.getEmail(),
                            loginReqDto.getPassword()
                    )
            );
            log.info("로그인 컨트롤러 에러 >>> " + authentication);
            String accssToken = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

            TokenDto tokenDto = TokenDto.builder()
                    .accessToken(accssToken)
                    .refreshToken(refreshToken)
                    .build();
            // 헤더에 토큰 담기
            jwtTokenProvider.setHeaderAccessToken(response, accssToken);
            jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

            log.info("토큰Dto 생성 후 에러 >>> " + tokenDto);

            return tokenDto;
        }catch (Exception e){
            e.printStackTrace();
            throw new BaseException(new ApiError(LOGIN_ERROR.getMessage(),LOGIN_ERROR.getCode()));
        }

    }

    public boolean nicknameCheck(String nickname){

        if(nickname.matches("^[0-9a-zA-Zㄱ-ㅎ가-힣]{2,8}$")){
            Optional<User> user = userRepository.findByNickname(nickname);
            if(!user.isEmpty()) throw new BaseException(new ApiError(EXIST_NICKNAME.getMessage(), EXIST_NICKNAME.getCode()));
            return true;

        }
        throw new BaseException(new ApiError(NICKNAME_UNMATCHED_FORMAT.getMessage(), NICKNAME_UNMATCHED_FORMAT.getCode()));

    }

    @Transactional
    public boolean nicknameUpdate(HttpServletRequest request, NicknameReqDto nicknameReqDto){

        if(nicknameReqDto.getNickname().matches("^[0-9a-zA-Zㄱ-ㅎ가-힣]{2,8}$")){
            User user = getUser(request);
            user.updateNickname(nicknameReqDto.getNickname());
            return true;
        }
        throw new BaseException(new ApiError(UPDATE_NICKNAME_ERROR.getMessage(), UPDATE_NICKNAME_ERROR.getCode()));
    }

    @Transactional
    public boolean profileImgUpdate(HttpServletRequest request, ProfileImgRequest profileImgRequest){
        try{
            User user = getUser(request);
            user.updateProfileImg(profileImgRequest.getProfileImgUrl());
            return true;
        }catch (Exception e){
            e.printStackTrace();
            throw new BaseException(new ApiError(UPDATE_PROFILE_IMG_ERROR.getMessage(), UPDATE_PROFILE_IMG_ERROR.getCode()));
        }
    }

    @Transactional
    public boolean deleteUser(HttpServletRequest request){
        User user = getUser(request);
        List<Voice> voiceList = voiceRepository.findByUser_IdAndStateIsThree(user.getId(), 3);
        for(Voice voice : voiceList){
            Product product = productRepository.findByVoice_VoiceId(voice.getVoiceId()).get();
            product.update(false);
            voice.update(true, 4);
        }
        userRepository.deleteById(user.getId());
        return true;
    }

    public UserInfoResponse getUserInfo(HttpServletRequest request){
        User user = getUser(request);
        return UserInfoResponse.builder()
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .build();
    }

    public User getUser(HttpServletRequest request){
        return userRepository.findByEmail(jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request)))
                .orElseThrow(()-> new BaseException(new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

}
