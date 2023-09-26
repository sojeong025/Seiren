import styles from './ProductCutomPage.module.css'
import { customAxios } from '../../libs/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProductCustomPage(){
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [productImg, setProductImg] = useState();
  const [price, setPrice] = useState();
  const [previewTexts, setPreviewTexts] = useState();
  const [categoryList, setCategoryList] = useState();



  const navigate = useNavigate();
  const marketProduct = () => {
    customAxios.post("product")
      .then((res) => {
        console.log("장터에 올리기 성공", res);
        navigate('/');
      })
      .catch((err) => console.log(err))
    };

  return(
    <div>
      장터 올릴 때 꾸며보자!
      <div>목소리 제목: <input type="text" /></div>
      <div></div>
      <button onClick={marketProduct}></button>
    </div>
  )
}

export default ProductCustomPage;