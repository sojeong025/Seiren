package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.Wish;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.product.repository.WishRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final WishRepository wishRepository;
    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;


    public int countWish(HttpServletRequest request) {
        User user = getUser(request);

        int wishCount = 0;
        List<Wish> wishList = wishRepository.findAll();
        for (Wish wish : wishList) {
            Product product = wish.getProduct();
            Voice voice = product.getVoice();
            if (voice.getUser().getId() == user.getId()) {
                wishCount++;
            }
        }
        return wishCount;

//        List<Voice> userCreatedVoices = voiceRepository.findByUserIdAndStateGreaterThanEqual(
//                user.getId(), 3);
//        if (!userCreatedVoices.isEmpty()) {
//            System.out.println("크기 : " + userCreatedVoices.size());
//            List<Long> userCreatedVoiceProducts = new ArrayList<>();
//            for (Voice voice : userCreatedVoices) {
//                userCreatedVoiceProducts.add(voice.getProduct().getProductId());
//            }
//            int wishCount = 0;
//            for (Long productId : userCreatedVoiceProducts) {
//                List<Wish> matchingWishes = wishRepository.findByProduct_ProductId(productId);
//                wishCount += matchingWishes.size();
//            }
//            return wishCount;
//        }
//        return 0;

    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }
}
