package ssafy.e105.Seiren.domain.oauth.kakao.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import ssafy.e105.Seiren.domain.user.dto.token.TokenDto;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoService {

    @Value("${kakao.client.id}")
    private  String KAKAO_CLIENT_ID;

    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${kakao.redirect.url}")
    private String KAKAO_REDIRECT_URL;

//    public TokenDto getKakaoLogin(String code) throws Exception{
//        if(code == null) throw  new Exception("코드를 가져오는데 오류가 발생했습니다.");
//
//    }
}
