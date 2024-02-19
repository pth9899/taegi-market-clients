import React from 'react'
import{useDispatch} from 'react-redux'
import { addToCart } from '../../../store/thunkFunction';
const ProductInfo = ({product}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addToCart({productId : product._id}))        
    }
  return (
    <div>
        <p className='text-xl text-bold'>商品情報</p>
        <ul>
            <li><span className='font-semibold text-gray-500'>値段：</span> {product.price}円</li>
            <li><span className='font-semibold text-gray-500'>売れた数:</span> {product.sold}</li>
            <li><span className='font-semibold text-gray-500'>商品説明：</span> {product.description}</li>
        </ul>
        <div className='mt-3'>
        <button 
        onClick={handleClick}
        className='w-full px-4 py-2 text-white bg-black hover:bg-gray-700 rounded-md'>
            かごに追加
        </button>
        </div>
    </div>
  )
}

export default ProductInfo
