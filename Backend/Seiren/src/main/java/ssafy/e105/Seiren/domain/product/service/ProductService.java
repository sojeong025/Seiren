package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.CREATE_PRODUCT_ERROR;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.jwt.JwtTokenProvider;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final VoiceRepository voiceRepository;

    @Transactional
    public boolean createProduct(ProductCreateRequest productCreateRequest, HttpServletRequest request) {
        try{
            Voice voice = voiceRepository.findById(productCreateRequest.getVoiceId()).get();
            productRepository.save(Product.toEntity(productCreateRequest, voice));
            return true;
        }catch (Exception e){
            e.printStackTrace();
            throw new BaseException(new ApiError(CREATE_PRODUCT_ERROR.getMessage(), CREATE_PRODUCT_ERROR.getCode()));
        }

    }

}
