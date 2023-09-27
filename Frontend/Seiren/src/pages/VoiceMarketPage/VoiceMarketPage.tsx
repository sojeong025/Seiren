import React, { useState, useEffect } from 'react';
import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css"
import { Link } from 'react-router-dom';
import { customAxios } from "../../libs/axios";

interface Product {
  nickname:string;
  price:number;
  categoryList: ProductCategory[];
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
    <Link to={`/product/${product.productId}`} className={styles.card}>
      <img src={product.productImageUrl} alt="Avatar"/>
      <h3>{product.title}</h3>
      <p>{product.nickname}</p>
      {product.categoryList && product.categoryList.map((category, index) => (
        <p key={index}>{category.categoryName}</p>
      ))}
    </Link>
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