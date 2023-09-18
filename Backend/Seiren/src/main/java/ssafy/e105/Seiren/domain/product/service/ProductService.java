package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.CREATE_PRODUCT_ERROR;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_CATEGORY;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_VOICE;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.category.entity.Category;
import ssafy.e105.Seiren.domain.category.repository.CategoryRepository;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;
import ssafy.e105.Seiren.domain.product.repository.PreviewRepository;
import ssafy.e105.Seiren.domain.product.repository.ProductCategoryRepository;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.product.repository.TestHistoryRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;
    private final CategoryRepository categoryRepository;
    private final PreviewRepository previewRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final TestHistoryRepository testHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Transactional
    public boolean createProduct(ProductCreateRequest productCreateRequest,
            HttpServletRequest request) {
        Voice voice = getVoice(productCreateRequest);
        User user = getUser(request);
        try {
            Product product = productRepository.save(Product.toEntity(productCreateRequest, voice));
            // 미리듣기 등록
            for (String text : productCreateRequest.getPreviewTexts()) {
                // 미리듣기 생성을 위해 ai 서버에 api 요청 보내는 코드 추가
            }
            // 상품 카테고리 등록
            for (Long categoryId : productCreateRequest.getCategoryList()) {
                Category category = getCategory(categoryId);
                productCategoryRepository.save(ProductCategory.toEntity(product, category));
            }
            // 테스트 히스토리 생성
            testHistoryRepository.save(TestHistory.toEntity(user, product));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(CREATE_PRODUCT_ERROR.getMessage(),
                    CREATE_PRODUCT_ERROR.getCode()));
        }

    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    public Voice getVoice(ProductCreateRequest productCreateRequest) {
        return voiceRepository.findById(productCreateRequest.getVoiceId())
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_VOICE.getMessage(), NOT_EXIST_VOICE.getCode())));
    }

    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BaseException(new ApiError(NOT_EXIST_CATEGORY.getMessage(),
                        NOT_EXIST_CATEGORY.getCode())));
    }


}
