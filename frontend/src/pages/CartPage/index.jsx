import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, payProducts, removeCartItem } from '../../store/thunkFunction';
import CartTable from './Section/CartTable';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let cartItemIds = []
    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      })
      const body = {
        cartItemIds,
        userCart: userData.cart
      }
      dispatch(getCartItems(body))
    }
  }, [dispatch, userData])

  useEffect(() => {
    calculateTotal(cartDetail)
  }, [cartDetail])


  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity);
    setTotal(total);
  }

const handleRemoveCartItem = (productId) => {
  dispatch(removeCartItem(productId));
}


  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>買い物かご</h2>
      </div>

      {cartDetail?.length > 0 ?
        <>
        <CartTable products = {cartDetail} onRemoveItem = {handleRemoveCartItem}/>
          <div className='mt-10'>
            <p><span className='font-bold'>合計</span>{total}円</p>
            <div className='px-4 py-2 mt-5 text-white bg-black hover:bg-gray-500'>
            <Link to ='/payment'>
            購入手続きへ
            </Link>
          </div>
          </div>   
        </>
        :
        <p className='text-red-600'>買い物かごには商品が入っていません。</p>
      }
    </section>
  )
}

export default CartPage