package ssafy.e105.Seiren.domain.product.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.product.dto.PreviewDto;
import ssafy.e105.Seiren.domain.product.entity.Preview;
import ssafy.e105.Seiren.domain.product.repository.PreviewRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PreviewService {

    private final PreviewRepository previewRepository;

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
}
