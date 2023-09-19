package ssafy.e105.Seiren.domain.purchase.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.category.entity.Category;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.repository.ProductCategoryRepository;
import ssafy.e105.Seiren.domain.purchase.dto.PurchaseProductListResponse;
import ssafy.e105.Seiren.domain.purchase.entity.PurchaseProduct;
import ssafy.e105.Seiren.domain.purchase.entity.UseHistory;
//import ssafy.e105.Seiren.domain.purchase.repository.BuyPurposeRepository;
import ssafy.e105.Seiren.domain.purchase.repository.PurchaseRepository;
import ssafy.e105.Seiren.domain.purchase.repository.UseHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
//    private final BuyPurposeRepository buyPurposeRepository;
    private final UseHistoryRepository useHistoryRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public User getUser(HttpServletRequest request){
        return userRepository.findByEmail(jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request)))
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    public List<PurchaseProductListResponse> getPurchaseList(HttpServletRequest request, int page, int size){
        User user = getUser(request);
        Pageable pageable = PageRequest.of(page, size);
//         상품 아바타, 상품 타이틀, 카테고리, 남은 글자수, 구매 글자수
        List<PurchaseProduct> purchaseProducts = purchaseRepository.findAllByBuyer(user, pageable).getContent();
        List<PurchaseProductListResponse> purchaseProductList = purchaseProducts
                .stream()
                .map(PurchaseProductListResponse::purchaseProductToDto)
                .collect(Collectors.toList());
        int purchaseProductsSize = purchaseProducts.size();
        for(int i=0; i<purchaseProductsSize; i++){
            purchaseProductList.get(i).setCategoryList(productCategoryRepository.findAllByProduct(purchaseProducts.get(i).getProduct()));
        }
        for(int i=0; i<purchaseProductsSize; i++){
            Long remainLetterNum = 0l;
            List<UseHistory> useHistories = useHistoryRepository.findAllByPurchaseProduct(purchaseProducts.get(i));
            for(UseHistory useHistory:useHistories){
                remainLetterNum += useHistory.getCharacterCount();
            }
            remainLetterNum = purchaseProductList.get(i).getLetternum() - remainLetterNum;
            purchaseProductList.get(i).setRemainletter(remainLetterNum);
        }
        return purchaseProductList;
    }


}
