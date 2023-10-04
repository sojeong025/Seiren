package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.OVER_RESTCOUNT;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;
import ssafy.e105.Seiren.domain.product.repository.TestHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TestHistoryService {

    private final TestHistoryRepository testHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ProductService productService;

    @Transactional
    public Integer checkTestCount(Long productId, HttpServletRequest request) {
        User user = getUser(request);
        System.out.println("요청을 받았을 때 : " + user.getId() + ", productId: " + productId);
        TestHistory testHistory = getTestHistory(user.getId(), productId);
        if (testHistory == null) { // 없는 경우
            testHistoryRepository.save(
                    TestHistory.toEntity(user,
                            productService.getProduct(productId))); // 생성과 함께 차감을 포함해 count 2로 설정
            System.out.println("없는 경우입니다.");
            return 2;
        }
        // 있는 경우
        int count = testHistory.getCount();
        if (count > 0) {
            testHistory.update();
            System.out.println("원래 있었고 횟수도 남아있습니다. 차감 후 : " + testHistory.getCount());
            return count - 1;
        }
        System.out.println("원래 있었으나 횟수가 남아있지 않습니다.");
        throw new BaseException(
                new ApiError(OVER_RESTCOUNT.getMessage(), OVER_RESTCOUNT.getCode()));
    }

    @Transactional
    public int countTest(Long productId, HttpServletRequest request) {
        User user = getUser(request);
        Product product = productService.getProduct(productId);
        TestHistory testHistory = getTestHistory(user.getId(), productId);
        if (testHistory == null) {
            testHistoryRepository.save(TestHistory.toEntity(user, product));
            System.out.println("카운트 요청을 받았을 때 기존 데이터가 없으면 객체를 생성해서 저장하는 부분입니다.");
            return 3;
        }
        System.out.println("카운트 요청을 받았을 때 기존 데이터가 있어서 카운트를 리턴합니다. : " + testHistory.getCount());
        return testHistory.getCount();
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    @Transactional
    public TestHistory getTestHistory(Long userId, Long productId) {
        Optional<TestHistory> testHistoryOptional = testHistoryRepository.findByUser_IdAndProduct_ProductId(
                userId, productId);
        // TestHistory를 찾았을 경우에 대한 처리
        return testHistoryOptional.orElse(null);
    }
}
