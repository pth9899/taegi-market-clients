import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from'dayjs'
const HistoryPage = () => {
  const userData = useSelector(state => state.user?.userData)
  return (
   <section>
    <div className='text-center m-7'>
    <h2 className='text-2xl'>購入履歴</h2>
    </div>
    <table className='w-full text-sm text-left text-gray-500'>
      <thead className='border-[1px]'>
        <tr>
          <th>
            決済
          </th>

          <th>
            値段
          </th>
          <th>
            数量
          </th>
          <th>
            販売日
          </th>
        </tr>
      </thead>
      <tbody>
    {userData?.history.map(item => (
      <tr className='border-b' key={item.paymentId}>
        <td>{item.paymentId}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
      </tr>
    ))}
      </tbody>
    </table>



   </section>
  )
}

export default HistoryPage