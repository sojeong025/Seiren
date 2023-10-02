package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.CREATE_PRODUCT_ERROR;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.FAIL_UPDATE_PRODUCT;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_CATEGORY;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_PRODUCT;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_VOICE;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.UNMACHED_PRODUCT_USER;
import static ssafy.e105.Seiren.domain.user.exception.UserErrorCode.NOT_EXIST_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.category.entity.Category;
import ssafy.e105.Seiren.domain.category.repository.CategoryRepository;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.dto.ProductDetailDto;
import ssafy.e105.Seiren.domain.product.dto.ProductDto;
import ssafy.e105.Seiren.domain.product.dto.ProductUpdateDto;
import ssafy.e105.Seiren.domain.product.entity.Preview;
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
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;
    private final CategoryRepository categoryRepository;
    private final PreviewRepository previewRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final TestHistoryRepository testHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final SearchService searchService;

    @Transactional
    public boolean createProduct(ProductCreateRequest productCreateRequest,
            HttpServletRequest request) {
        Voice voice = getVoice(productCreateRequest.getVoiceId());
        User user = getUser(request);
        List<String> textList = productCreateRequest.getPreviewTexts();
        List<String> previewUrlList = productCreateRequest.getPreviewUrls();
        try {
            Product product = productRepository.save(Product.toEntity(productCreateRequest, voice));
            // 목소리 상태 판매중으로 변경
            voice.update(3);
            // 미리듣기 등록 코드 추가 필요
            for (int i = 0; i < 3; i++) {
                previewRepository.save(
                        Preview.toEntity(product, textList.get(i), previewUrlList.get(i)));
            }
            // 상품 카테고리 등록
            for (Long categoryId : productCreateRequest.getCategoryList()) {
                Category category = getCategory(categoryId);
                productCategoryRepository.save(ProductCategory.toEntity(product, category));
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(CREATE_PRODUCT_ERROR.getMessage(),
                    CREATE_PRODUCT_ERROR.getCode()));
        }

    }

    @Transactional
    public ProductDetailDto getProductDetail(Long productId, HttpServletRequest request) {
        Product product = getProduct(productId);
        Voice voice = product.getVoice();
        User user = getUser(request);
        // 테스트 히스토리 생성
        testHistoryRepository.save(TestHistory.toEntity(user, product));
        List<ProductCategory> productCategoryList = product.getProductCategories();
        List<String> categoryList = new ArrayList<>();
        for (ProductCategory productCategory : productCategoryList) {
            Category category = categoryRepository.findById(productCategory.getCategory().getId())
                    .get();
            categoryList.add(category.getName());
        }
        ProductDetailDto productDetailDto = new ProductDetailDto(product, voice, categoryList);

        return productDetailDto;
    }

    @Transactional
    public void changeState(Long productId, HttpServletRequest request) {
        Product product = getProduct(productId);
        Voice voice = getVoice(product.getVoice().getVoiceId());
        User user = getUser(request);
        try {
            if (voice.getUser() == user) {
                product.update(product.getState() ? false : true);
                productRepository.save(product);
                voice.update(product.getState() ? 2 : 3);
                voiceRepository.save(voice);
                return;
            }
            throw new BaseException(new ApiError(UNMACHED_PRODUCT_USER.getMessage(),
                    UNMACHED_PRODUCT_USER.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_UPDATE_PRODUCT.getMessage(), FAIL_UPDATE_PRODUCT.getCode()));
        }
    }

    @Transactional
    public void updateProduct(ProductUpdateDto productUpdateDto, HttpServletRequest request) {
        Product product = getProduct(productUpdateDto.getProductId());
        Voice voice = getVoice(product.getVoice().getVoiceId());
        User user = getUser(request);
        try {
            if (voice.getUser() == user) {
                product.update(productUpdateDto);
                productRepository.save(product);
                return;
            }
            throw new BaseException(new ApiError(UNMACHED_PRODUCT_USER.getMessage(),
                    UNMACHED_PRODUCT_USER.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_UPDATE_PRODUCT.getMessage(), FAIL_UPDATE_PRODUCT.getCode()));
        }
    }

    @Transactional
    public List<ProductDto> getAllProducts(HttpServletRequest request, int page) {
        User user = isUser(request);
        int size = 12;
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Product> productPage = productRepository.findAllProductsOrderByCreateAtDesc(pageable);
        return searchService.getProductDtoList(productPage, user);
    }

    public User getUser(HttpServletRequest request) {
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_USER.getMessage(), NOT_EXIST_USER.getCode())));
    }

    public Voice getVoice(Long voiceId) {
        return voiceRepository.findById(voiceId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_VOICE.getMessage(), NOT_EXIST_VOICE.getCode())));
    }

    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_CATEGORY.getMessage(), NOT_EXIST_CATEGORY.getCode())));
    }

    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXIST_PRODUCT.getMessage(), NOT_EXIST_PRODUCT.getCode())));
    }

    @Transactional
    public User isUser(HttpServletRequest request) {
        if (jwtTokenProvider.resolveToken(request) != null) {
            String userEmail = jwtTokenProvider.getUserEmail(
                    jwtTokenProvider.resolveToken(request));
            return userRepository.findByEmail(userEmail).get();
        }
        return null;
    }

    public Long getProductId(Long voiceId) {
        return productRepository.findByVoiceId(voiceId).getProductId();
    }
}
