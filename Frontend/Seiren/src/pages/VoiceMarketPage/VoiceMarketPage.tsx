import { useState } from "react";
import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";


interface Product {
  nickname: string;
  price: number;
  productCategoryList: ProductCategory[];
  productId: number;
  productImageUrl: string;
  summary: string;
  title: string;
  wish: boolean;
}
interface ProductCategory {
  categoryId: number;
  categoryName: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img className={styles.card_img} src={product.productImageUrl} alt="Avatar" />
      </div>
      <div className={styles.mid}>
        <div className={styles.card_title}>{product.title}</div>

        {product.productCategoryList &&
          product.productCategoryList.map((category, index) => (
            <div className={styles.card_category} key={index}>
              {" "}
              #{category.categoryName}
            </div>
          ))}

        <div className={styles.card_nickname}>{product.nickname}</div>
      </div>
      <div className={styles.right}>
        {/* <div className={styles.wish}>{product.wish? <BsHeartFill/> : <BsHeart />}</div> */}
        <Link to={`/product/${product.productId}`} className={styles.detail}>
          {" "}
          들어보기{" "}
        </Link>
      </div>
    </div>
  );
}

function VoiceMarketPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

    const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.total}>
      <FavoriteVoice />
      <Filter products={products} setProducts={setProducts} />
      <div className={styles.container}>
        <div className={styles.cards}>
          {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
      <div className={styles.pagi}>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalAmount={products.length}
        />
      </div>
    </div>
  );
}

export default VoiceMarketPage;
