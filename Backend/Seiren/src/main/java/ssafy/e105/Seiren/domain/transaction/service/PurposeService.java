package ssafy.e105.Seiren.domain.transaction.service;

import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.transaction.dto.PurposeCreateRequest;
import ssafy.e105.Seiren.domain.transaction.entity.Purpose;
import ssafy.e105.Seiren.domain.transaction.repository.PurposeRepository;

@Service
@RequiredArgsConstructor
public class PurposeService {

    private final PurposeRepository purposeRepository;

    @Transactional
    public void createPurpose(PurposeCreateRequest purposeCreateDto) {
        purposeRepository.save(Purpose.toEntity(purposeCreateDto));
    }

    @Transactional
    public void deletePurpose(Long purposeId) {
        purposeRepository.deleteById(purposeId);
    }

    public List<Purpose> getAllPurpose() {
        List<Purpose> purposeList = purposeRepository.findAll();
        return purposeList;
    }
}
