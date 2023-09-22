package ssafy.e105.Seiren.domain.transaction.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.repository.ProductCategoryRepository;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductDetailResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductTTSRequest;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.transaction.entity.UseHistory;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionRepository;
import ssafy.e105.Seiren.domain.transaction.repository.UseHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

import java.util.List;
import java.util.stream.Collectors;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_PRODUCT;
import static ssafy.e105.Seiren.domain.transaction.exception.TransactionErrorCode.NOT_EXIST_TRANSACTION;
import static ssafy.e105.Seiren.domain.transaction.exception.TransactionErrorCode.OVER_RESTCOUNT;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UseHistoryRepository useHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public List<TransactionProductResponse> getTransactionProductList(HttpServletRequest request, int page, int size){
        User user = getUser(request);

        Pageable pageable = PageRequest.of(page, size);
        List<Transaction> transactionPage = transactionRepository.findAllByBuyer(user, pageable).getContent();
        // 상품 사진, 상품 타이틀 셋팅
        List<TransactionProductResponse> transactionProductResponseList = transactionPage
                .stream()
                .map(TransactionProductResponse::toDto)
                .collect(Collectors.toList());

        int transactionPageSize = transactionPage.size();

        // 상품 카테고리, 남은 글자수, 구매 글자수 셋팅
        for(int i=0; i<transactionPageSize; i++){
            transactionProductResponseList.get(i)
                    .setProductCategories(productCategoryRepository.findAllByProduct(transactionPage.get(i).getProduct()));
            transactionProductResponseList.get(i).setTotalCount(transactionPage.get(i).getTotalCount());
            transactionProductResponseList.get(i).setRemainLetter(transactionPage.get(i).getRestCount());
        }
        return transactionProductResponseList;
    }

    public TransactionProductDetailResponse getTransactionProductDetail(HttpServletRequest request, Long productId){
        User user = getUser(request);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_PRODUCT.getMessage(), NOT_EXIST_PRODUCT.getCode())));

        Transaction transaction = transactionRepository.findByBuyerAndProduct(user, product)
                .orElseThrow(()->new BaseException(new ApiError(NOT_EXIST_TRANSACTION.getMessage(), NOT_EXIST_TRANSACTION.getCode())));

        return TransactionProductDetailResponse.builder()
                .transactionId(transaction.getId())
                .productImageUrl(product.getProductImageUrl())
                .productTitle(product.getProductTitle())
                .productCategories(product.getProductCategories())
                .summary(product.getSummary())
                .remainLetter(transaction.getRestCount())
                .totalCount(transaction.getTotalCount())
                .build();
    }

    @Transactional
    public boolean registTTS(HttpServletRequest request, TransactionProductTTSRequest transactionProductTTSRequest){
        User user = getUser(request);
        Transaction transaction = transactionRepository.findById(transactionProductTTSRequest.getTransactionId())
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_TRANSACTION.getMessage(), NOT_EXIST_TRANSACTION.getCode())));
        if(transaction.getRestCount() < transactionProductTTSRequest.getText().length()){
            throw new BaseException(new ApiError(OVER_RESTCOUNT.getMessage(), OVER_RESTCOUNT.getCode()));
        }
        UseHistory useHistory = UseHistory.toDto(transaction, transactionProductTTSRequest.getText());
        useHistoryRepository.save(useHistory);
        transaction.minusRestCount(transactionProductTTSRequest.getText().length());
        return true;
    }




    public User getUser(HttpServletRequest request){
        return userRepository.findByEmail(jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request)))
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }


}
