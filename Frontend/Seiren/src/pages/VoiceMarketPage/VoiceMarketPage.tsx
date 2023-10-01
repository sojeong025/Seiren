import React, { useState, useEffect } from 'react';
import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css"
import { Link } from 'react-router-dom';
import { customAxios } from "../../libs/axios";
import { BsHeartFill, BsHeart} from "react-icons/bs"

interface Product {
  nickname:string;
  price:number;
  productCategoryList: ProductCategory[];
  productId:number;
  productImageUrl:string;
  summary:string;
  title:string;
  wish:boolean;
}
interface ProductCategory{
  categoryId:number;
  categoryName:string;
}

function ProductCard({ product }: { product : Product }) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img className={styles.card_img} src={product.productImageUrl} alt="Avatar"/>
      </div>
      <div className={styles.mid}>
        <div className={styles.card_title}>{product.title}</div>

        {product.productCategoryList && product.productCategoryList.map((category, index) => (
          <div className={styles.card_category} key={index}> #{category.categoryName}</div>
          ))}
          
        <div className={styles.card_nickname}>{product.nickname}</div>
      </div>
      <div className={styles.right}>
        {/* <div className={styles.wish}>{product.wish? <BsHeartFill/> : <BsHeart />}</div> */}
        <Link to={`/product/${product.productId}`} className={styles.detail}> 들어보기 </Link>
      </div>
    </div>
  );
}

function VoiceMarketPage() {
  const [products, setProducts] = useState<Product[]>([]);

return (
  <div className={styles.total}>
    <FavoriteVoice/>
    <Filter products={products} setProducts={setProducts}/>
    <div className={styles.container}>
      <div className={styles.cards}>
        {products && products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  </div>
);

}

export default VoiceMarketPage;