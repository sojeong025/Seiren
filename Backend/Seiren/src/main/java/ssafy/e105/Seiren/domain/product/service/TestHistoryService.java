package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.TestTTSRequest;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;
import ssafy.e105.Seiren.domain.product.repository.TestHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class TestHistoryService {

    private final TestHistoryRepository testHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Transactional
    public String createTestFile(TestTTSRequest testTTSRequestDto, HttpServletRequest request) {
        // 학습된 모델 API 호출
        // 입력받은 testTTSRequestDto의 테스트 문장으로 음성 파일 생성
        // 해당 음성 파일을 반환
        // 해당 유저의 본 상품에 대한 테스트 카운트 감소
        String testFileUrl = "";
        return testFileUrl;
    }

    public int countTest(Long productId, HttpServletRequest request) {
        User user = getUser(request);
        TestHistory testHistory = testHistoryRepository.findCountByUser_IdAndProduct_ProductId(
                user.getId(),
                productId);
        int count = testHistory.getCount();
        return count;
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }
}
