package ssafy.e105.Seiren.domain.transaction.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_PRODUCT;
import static ssafy.e105.Seiren.domain.transaction.exception.TransactionErrorCode.NOT_EXIST_TRANSACTION;
import static ssafy.e105.Seiren.domain.transaction.exception.TransactionErrorCode.OVER_RESTCOUNT;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductDetailResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductHistoryResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductReceiptResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductResponse;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductTTSRequest;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;
import ssafy.e105.Seiren.domain.transaction.entity.UseHistory;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionDescriptionRepository;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionRepository;
import ssafy.e105.Seiren.domain.transaction.repository.UseHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final UseHistoryRepository useHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final TransactionDescriptionRepository transactionDescriptionRepository;

    public List<TransactionProductResponse> getTransactionProductList(HttpServletRequest request,
            int page, int size) {
        User user = getUser(request);

        Pageable pageable = PageRequest.of(page, size);
        List<Transaction> transactionPage = transactionRepository.findAllByBuyer(user.getId(),
                pageable).getContent();
        // 상품 사진, 상품 타이틀 셋팅
        List<TransactionProductResponse> transactionProductResponseList = transactionPage
                .stream()
                .map(TransactionProductResponse::toDto)
                .collect(Collectors.toList());

        int transactionPageSize = transactionPage.size();

        // 상품 카테고리, 남은 글자수, 구매 글자수 셋팅
        for (int i = 0; i < transactionPageSize; i++) {
            transactionProductResponseList.get(i)
                    .setTotalCount(transactionPage.get(i).getTotalCount());
            transactionProductResponseList.get(i)
                    .setRemainLetter(transactionPage.get(i).getRestCount());
        }
        for (int i = 0; i < transactionPageSize; i++) {
            List<ProductCategory> productCategories = transactionPage.get(i).getProduct()
                    .getProductCategories();
            List<String> categoryList = new ArrayList<>();
            for (ProductCategory productCategory : productCategories) {
                categoryList.add(productCategory.getCategory().getName());
            }
            transactionProductResponseList.get(i).setProductCategories(categoryList);
        }
        return transactionProductResponseList;
    }

    public TransactionProductDetailResponse getTransactionProductDetail(HttpServletRequest request,
            Long productId) {
        User user = getUser(request);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_PRODUCT.getMessage(), NOT_EXIST_PRODUCT.getCode())));

        Transaction transaction = transactionRepository.findByBuyerAndProduct(user.getId(),
                        product.getProductId())
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_TRANSACTION.getMessage(),
                                NOT_EXIST_TRANSACTION.getCode())));

        List<String> categoryList = new ArrayList<>();

        for (ProductCategory productCategory : product.getProductCategories()) {
            categoryList.add(productCategory.getCategory().getName());
        }

        return TransactionProductDetailResponse.builder()
                .transactionId(transaction.getId())
                .productImageUrl(product.getProductImageUrl())
                .productTitle(product.getProductTitle())
                .productCategories(categoryList)
                .summary(product.getSummary())
                .remainLetter(transaction.getRestCount())
                .totalCount(transaction.getTotalCount())
                .build();
    }

    @Transactional
    public boolean registTTS(HttpServletRequest request,
            TransactionProductTTSRequest transactionProductTTSRequest) {
        User user = getUser(request);
        Transaction transaction = transactionRepository.findById(
                        transactionProductTTSRequest.getTransactionId())
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_TRANSACTION.getMessage(),
                                NOT_EXIST_TRANSACTION.getCode())));
        if (transaction.getRestCount() < transactionProductTTSRequest.getText().length()) {
            throw new BaseException(
                    new ApiError(OVER_RESTCOUNT.getMessage(), OVER_RESTCOUNT.getCode()));
        }
        UseHistory useHistory = UseHistory.toDto(transaction,
                transactionProductTTSRequest.getText());
        useHistoryRepository.save(useHistory);
        /**
         * 글자수 빼기
         */
        transaction.minusRestCount(transactionProductTTSRequest.getText().length());
        return true;
    }

    public List<TransactionProductHistoryResponse> getTransactionProductHistory(Long transactionId,
            int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_TRANSACTION.getMessage(),
                                NOT_EXIST_TRANSACTION.getCode())));
        /**
         * 사용 내역
         */
        List<TransactionProductHistoryResponse> transactionProductHistoryResponseList = useHistoryRepository.findAllByTransaction(
                        transaction, pageable)
                .getContent()
                .stream()
                .map(TransactionProductHistoryResponse::toDto)
                .collect(Collectors.toList());
        return transactionProductHistoryResponseList;
    }

    public int getTransactionTotal(HttpServletRequest request) {
        User user = getUser(request);
        return transactionRepository.findByBuyer(user.getId());
    }

    public List<TransactionProductReceiptResponse> getTransactionProductReceipt(
            HttpServletRequest request, int page, int size) {
        User user = getUser(request);
        Pageable pageable = PageRequest.of(page, size);
        List<TransactionDescription> transactionDescriptionList = transactionDescriptionRepository.findAllByTransaction(
                user.getId(), pageable).getContent();
        /**
         * 거래 설명 셋팅
         */
        List<TransactionProductReceiptResponse> transactionProductReceiptResponseList = transactionDescriptionList
                .stream()
                .map(TransactionProductReceiptResponse::toDto)
                .collect(Collectors.toList());
        int transactionDescriptionListSize = transactionDescriptionList.size();
        /**
         * seller 구하기
         */
        for (int i = 0; i < transactionDescriptionListSize; i++) {
            transactionProductReceiptResponseList.get(i).setSeller(
                    transactionDescriptionList.get(i).getTransaction().getSeller().getNickname());
        }
        /**
         * total가격
         */
        for (int i = 0; i < transactionDescriptionListSize; i++) {
            Double totalPrice = transactionProductReceiptResponseList.get(i).getPrice()
                    * transactionProductReceiptResponseList.get(i).getBuyLetterCount();
            transactionProductReceiptResponseList.get(i).setTotalPrice(totalPrice);
        }

        return transactionProductReceiptResponseList;
    }


    public User getUser(HttpServletRequest request) {
        return userRepository.findByEmail(
                        jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request)))
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }


}
