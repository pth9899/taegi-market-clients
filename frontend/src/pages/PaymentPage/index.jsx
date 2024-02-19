import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, payProducts } from '../../store/thunkFunction';
import PaymentTable from './Section/PaymentTable';
import Paypal from '../../utils/Paypal';
const PaymentPage = () => {
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


  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail }))
  }

  return (
    <section>
    <div className='text-center m-7'>
      <h2 className='text-2xl'>詳細決済ページ</h2>
    </div>
    {cartDetail?.length > 0 ?
      <>
      <PaymentTable products = {cartDetail} />
        <div className='mt-10'>
          <p><span className='font-bold'>合計</span>{total}円</p>
          <button 
          className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'
          onClick={handlePaymentClick}
          >
            決済
          </button>
          <div>
          {calculateTotal && 
         <Paypal 
         total ={total}
         /> 
         }
          </div>
         <div>

         </div>



        </div>
      </>
      :
      <p className='text-red-600'>買い物かごには商品が入っていません。</p>

    }

  </section>
  )
}

export default PaymentPage