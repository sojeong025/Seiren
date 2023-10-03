package ssafy.e105.Seiren.domain.oauth.kakao.service;

import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoService {

    private final static String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    private final static String KAKAO_API_URI = "https://kapi.kakao.com";
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Value("${kakao.client.id}")
    private String KAKAO_CLIENT_ID;
    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;
    @Value("${spring.data.kakao-redirectUrl}")
    private String KAKAO_REDIRECT_URL;

    @Transactional
    public TokenDto getKakaoInfo(String code) throws Exception {
        if (code == null) {
            throw new Exception("코드를 가져오는데 오류가 발생했습니다.");
        }

        String accessToken = "";
        String refreshToken = "";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", KAKAO_CLIENT_ID);
            params.add("client_secret", KAKAO_CLIENT_SECRET);
            params.add("code", code);
            params.add("redirect_uri", KAKAO_REDIRECT_URL);

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params,
                    headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    KAKAO_AUTH_URI + "/oauth/token",
                    HttpMethod.POST,
                    httpEntity,
                    String.class
            );

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());

            accessToken = (String) jsonObj.get("access_token");
            refreshToken = (String) jsonObj.get("refresh_token");

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("API call failed");
        }
        return getUserInfoWithToken(accessToken);

    }

    @Transactional
    public TokenDto getUserInfoWithToken(String accessToken) throws Exception {
        //HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HttpHeader 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);
        ResponseEntity<String> response = rt.exchange(
                KAKAO_API_URI + "/v2/user/me",
                HttpMethod.POST,
                httpEntity,
                String.class
        );

        //Response 데이터 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
        System.out.println("jsonObj = " + jsonObj);
        JSONObject account = (JSONObject) jsonObj.get("kakao_account");
        JSONObject profile = (JSONObject) account.get("profile");

        long id = (long) jsonObj.get("id");
        String email = String.valueOf(account.get("email"));
//        String nickname = String.valueOf(profile.get("nickname"));
        String profileImg = String.valueOf(profile.get("profile_image_url"));

        Optional<User> user = userRepository.findByEmail(email);
        String nickname = generateUniqueNickname();

        if (user.isEmpty()) {
            userRepository.save(User.toEntity(email, nickname, profileImg, passwordEncoder));
            userRepository.flush();
        }

        Optional<User> oauthUser = userRepository.findByEmail(email);

        try {
            log.info("email = {}", oauthUser.get().getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            email
                    )
            );

            String accessToken2 = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication);
            return TokenDto.builder()
                    .accessToken(accessToken2)
                    .refreshToken(refreshToken)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new NullPointerException("로그인 에러");
        }
    }

    public String generateUniqueNickname() {
//        UUID uuid = UUID.randomUUID();
        String nickname = UUID.randomUUID().toString();
        boolean check = true;
        while (check) {
            Optional<User> user = userRepository.findByNickname(nickname);
            if (user.isEmpty()) {
                check = false;
            }
            nickname = UUID.randomUUID().toString();
        }
        return nickname;
    }
}
