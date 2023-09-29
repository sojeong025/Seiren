package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.OVER_RESTCOUNT;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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
public class TestHistoryService {

    private final TestHistoryRepository testHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ProductService productService;

    @Transactional
    public boolean checkTestCount(Long productId, HttpServletRequest request) {
        User user = getUser(request);
        if (countTest(productId, request) > 0) {
            TestHistory testHistory = testHistoryRepository.findCountByUser_IdAndProduct_ProductId(
                    user.getId(), productId);
            testHistory.update();
            return true;
        }
        throw new BaseException(
                new ApiError(OVER_RESTCOUNT.getMessage(), OVER_RESTCOUNT.getCode()));
    }

    @Transactional
    public int countTest(Long productId, HttpServletRequest request) {
        User user = getUser(request);
        Product product = productService.getProduct(productId);
        TestHistory testHistory = testHistoryRepository.findCountByUser_IdAndProduct_ProductId(
                user.getId(), productId);
        if (testHistory != null) {
            return testHistory.getCount();
        }
        testHistoryRepository.save(TestHistory.toEntity(user, product));
        return 3;
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }
}
