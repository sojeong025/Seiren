import { useEffect, useState } from "react";
import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagi";
import { customAxios } from "../../libs/axios";

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
  const [wList, setwList] = useState(false);

  useEffect(() => {
    customAxios
      .get(`wish`)
      .then(res => {
        const list = res.data.response.wishList;
        const wishedList = list.map(item => item.productId);
        
        setwList(wishedList.includes(product.productId));
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, []);

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
        <Link to={`/product/${product.productId}?wList=${wList}`} className={styles.detail}>
          들어보기
        </Link>
      </div>
    </div>
  );
}

function VoiceMarketPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();

  // 자식 컴포넌트에서 호출할 콜백 함수
  const updateTotal = newTotal => {
    setTotal(newTotal);
  };

  const onPageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.total}>
      <FavoriteVoice />
      <Filter products={products} setProducts={setProducts} setTotal={updateTotal} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className={styles.container}>
        <div className={styles.cards}>
          {products.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
      <div className={styles.pagi}>
        <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPageNum={total} />
      </div>
    </div>
  );
}

export default VoiceMarketPage;
