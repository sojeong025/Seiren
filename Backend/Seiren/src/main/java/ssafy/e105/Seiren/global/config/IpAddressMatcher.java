package ssafy.e105.Seiren.global.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.matcher.RequestMatcher;

public class IpAddressMatcher implements RequestMatcher {

    private String ipAddress;

    public IpAddressMatcher(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        return request.getRemoteAddr().equals(this.ipAddress);
    }
}
