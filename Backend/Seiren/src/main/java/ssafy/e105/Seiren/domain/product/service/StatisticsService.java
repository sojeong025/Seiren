package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductStatisticsDetailDto;
import ssafy.e105.Seiren.domain.product.dto.ProductStatisticsDto;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.Wish;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.product.repository.WishRepository;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionDescriptionRepository;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final WishRepository wishRepository;
    private final ProductRepository productRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionDescriptionRepository transactionDescriptionRepository;


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
    }

    public List<ProductStatisticsDto> getAllProductStatisticsList(HttpServletRequest request) {
        User user = getUser(request);
        List<Long> productIdList = transactionRepository.findAllBySellerId(user.getId());
        List<ProductStatisticsDto> productStatisticsDtoList = new ArrayList<>();
        for (Long productId : productIdList) {
            Product product = productRepository.findByProductId(productId);
            int totalSumCount = transactionRepository.sumTotalCountByProductIdAndSellerId(
                    user.getId(), productId);
            ProductStatisticsDto productStatisticsDto = new ProductStatisticsDto(product,
                    totalSumCount);
            productStatisticsDtoList.add(productStatisticsDto);
        }
        return productStatisticsDtoList;
    }

    public List<ProductStatisticsDetailDto> getStatisticsDetail(HttpServletRequest request,
            Long productId) {
        User user = getUser(request);
        List<ProductStatisticsDetailDto> productStatisticsDetailDtoList = new ArrayList<>();
        List<TransactionDescription> transactionDescriptionList = transactionDescriptionRepository.findByProductIdAndSellerIdOrderByBuyDateDESC(
                productId, user.getId());
        System.out.println("size : " + transactionDescriptionList.size());
        for (TransactionDescription transactionDescription : transactionDescriptionList) {
            ProductStatisticsDetailDto productStatisticsDetailDto = new ProductStatisticsDetailDto(
                    transactionDescription);
            productStatisticsDetailDtoList.add(productStatisticsDetailDto);
        }
        return productStatisticsDetailDtoList;
    }

    public Map<LocalDate, Double> getStatistics(HttpServletRequest request, int month) {
        User user = getUser(request);

        List<TransactionDescription> transactionDescriptionList = transactionDescriptionRepository.findBySellerIdAndMonth(
                user.getId(), month);
        return calculateTotalPriceByDate(transactionDescriptionList);
    }

    public Map<LocalDate, Double> calculateTotalPriceByDate(
            List<TransactionDescription> transactionDescriptions) {
        // LocalDateTime을 LocalDate로 변환하고 일자(day) 별로 그룹화하여 수익을 계산합니다.
        Map<LocalDate, Double> totalPriceByDate = transactionDescriptions.stream()
                .collect(Collectors.groupingBy(
                        td -> td.getBuyDate().toLocalDate(),
                        Collectors.summingDouble(td -> td.getPrice() * td.getBuyLetterCount())
                ));

        return totalPriceByDate;
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }
}
