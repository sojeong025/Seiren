import React, { useState, useEffect } from 'react';
import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css"
import { Link } from 'react-router-dom';
import { customAxios } from "../../libs/axios";

interface Product {
  id: number;
  avatar: string;
  title: string;
  seller: string;
  category: string[];
}

function ProductCard({ product }: { product : Product }) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img src={product.avatar} alt="Avatar" width={"100px"} />
      <h3>{product.title}</h3>
      <p>{product.seller}</p>
      {product.category.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </Link>
  );
}

function VoiceMarketPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await customAxios.post('/products', {
        "nickname": "재키",
        "categoryIdList": [6,8],
        "sortType": "Latest"
      });

      
      if(response.data.success) {
        const productsData = response.data.response.productDtoList.map((product:any) => ({
          id: product.productId,
          avatar: product.productImageUrl,
          title: product.title,
          seller:"",
          category: product.productCategoryList.map((category:any)=>category.categoryName)
        }));
        setProducts(productsData);
      }
    };
    fetchProducts();
  }, []); 

return (
  <div>
    <FavoriteVoice/>
    <Filter />
    <div className={styles.container}>
      <div className={styles.cards}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);

}

export default VoiceMarketPage;