package ssafy.e105.Seiren.domain.transaction.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.transaction.dto.TransactionProductResponse;
import ssafy.e105.Seiren.domain.transaction.repository.TransactionRepository;
import ssafy.e105.Seiren.domain.transaction.repository.UseHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

import java.util.List;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

//    private final TransactionRepository transactionRepository;
//    private final UseHistoryRepository useHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

//    public List<TransactionProductResponse> getTransactionProductList(HttpServletRequest request){
//
//    }

    public User getUser(HttpServletRequest request){
        return userRepository.findByEmail(jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request)))
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }


}
