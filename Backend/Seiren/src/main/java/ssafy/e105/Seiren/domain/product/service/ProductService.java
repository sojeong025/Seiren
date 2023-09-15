package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.CREATE_PRODUCT_ERROR;
import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_VOICE;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.repository.PreviewRepository;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;
    private final PreviewRepository previewRepository;

    @Transactional
    public boolean createProduct(ProductCreateRequest productCreateRequest,
            HttpServletRequest request) {
        Voice voice = voiceRepository.findById(productCreateRequest.getVoiceId())
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_VOICE.getMessage(), NOT_EXIST_VOICE.getCode())));
        try {
            Product product = productRepository.save(Product.toEntity(productCreateRequest, voice));
            for (String text : productCreateRequest.getPreviewTexts()) {
                // 미리듣기 생성을 위해 ai 서버에 api 요청 보내는 코드 추가
            }
            // product_category 생성하는 코드 추가
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(CREATE_PRODUCT_ERROR.getMessage(),
                    CREATE_PRODUCT_ERROR.getCode()));
        }

    }

}
