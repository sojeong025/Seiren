package ssafy.e105.Seiren.domain.product.service;

import static ssafy.e105.Seiren.domain.product.exception.ProductErrorCode.NOT_EXIST_PRODUCT;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.product.dto.PreviewDto;
import ssafy.e105.Seiren.domain.product.entity.Preview;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.repository.PreviewRepository;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class PreviewService {

    private final PreviewRepository previewRepository;
    private final ProductRepository productRepository;

    @Transactional
    public PreviewDto getProductPreview(Long productId, HttpServletRequest request) {
        List<Preview> previewList = previewRepository.findByProduct_ProductId(productId);
        List<String> previewUrls = new ArrayList<>();
        for (Preview preview : previewList) {
            previewUrls.add(preview.getPreviewUrl());
        }
        PreviewDto previewDto = new PreviewDto(previewUrls);
        return previewDto;
    }

    public Product getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BaseException(
                        new ApiError(NOT_EXIST_PRODUCT.getMessage(), NOT_EXIST_PRODUCT.getCode())));
    }
}
