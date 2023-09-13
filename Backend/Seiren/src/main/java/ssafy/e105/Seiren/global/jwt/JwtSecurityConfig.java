package ssafy.e105.Seiren.global.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * JwtTokenProvider과 JwtFilter를 SecurityConfig에 적용
 * */

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void configure(HttpSecurity http) throws  Exception{
        JwtFilter customFilter = new JwtFilter(jwtTokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
//        UsernamePasswordAuthenticationFilter란 Form based Authentication 방식으로 인증을 진행할 때
//        아이디, 패스워드 데이터를 파싱하여 인증 요청을 위임하는 필터이다.
    }
}
