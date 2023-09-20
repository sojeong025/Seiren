package ssafy.e105.Seiren.domain.product.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.product.dto.ProductCategoryDto;
import ssafy.e105.Seiren.domain.product.dto.ProductDto;
import ssafy.e105.Seiren.domain.product.dto.ProductSearchResponse;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.product.repository.ProductRepository;
import ssafy.e105.Seiren.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductSearchResponse searchProduct(String nickname,
            HttpServletRequest request) {
        List<Product> productList = productRepository.findAllProductByUserNickname(nickname);
        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {
            List<ProductCategoryDto> productCategoryDtoList = new ArrayList<>();
            for (ProductCategory productCategory : product.getProductCategories()) {
                ProductCategoryDto productCategoryDto = new ProductCategoryDto(
                        productCategory);
                productCategoryDtoList.add(productCategoryDto);
            }
            ProductDto productDto = new ProductDto(product, productCategoryDtoList);
            productDtoList.add(productDto);
        }
        return new ProductSearchResponse(productDtoList);
    }
}
