package ssafy.e105.Seiren.domain.transaction.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.e105.Seiren.domain.transaction.dto.PurposeCreateRequest;
import ssafy.e105.Seiren.domain.transaction.service.PurposeService;
import ssafy.e105.Seiren.global.utils.ApiResult;
import ssafy.e105.Seiren.global.utils.ApiUtils;

@RestController
@RequiredArgsConstructor
@Tag(name = "거래 목적 API")
public class PurposeController {

    private final PurposeService purposeService;

    @Operation(summary = "거래 목적 추가")
    @PostMapping("/api/purpose")
    public ApiResult<?> createPurpose(@RequestBody PurposeCreateRequest purposeCreateDto) {
        purposeService.createPurpose(purposeCreateDto);
        return ApiUtils.success("성공적으로 거래목적을 추가 했습니다");
    }

    @Operation(summary = "거래 목적 삭제")
    @DeleteMapping("/api/purpose/{purposeId}")
    public ApiResult<?> deletePurpose(@PathVariable Long purposeId) {
        purposeService.deletePurpose(purposeId);
        return ApiUtils.success("성공적으로 거래목적을 삭제 했습니다");
    }

    @Operation(summary = "거래 목적 목록 조회")
    @GetMapping("/api/purposes")
    public ApiResult<?> getPurposeList() {
        return ApiUtils.success(purposeService.getAllPurpose());
    }
}
