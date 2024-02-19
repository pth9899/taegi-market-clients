import React from 'react'

const CartTable = ({products,onRemoveItem}) => {
    const renderCartImage = (images) => {
        if(images.length> 0) {
            let image = images[0]
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        } 
    }

    const renderItems = (
        products.length > 0 && products.map(product => (
            <tr key={product._id}>
                <td>
                    <img
                        className='w-[70px]'
                        alt='product'
                        src={renderCartImage(product.images)}
                    />
                </td>
                <td>
                    {product.quantity}
                </td>
                <td>
                    {product.price} 円
                </td>
                <td>
                    <button onClick={() => onRemoveItem(product._id)}>
                        削除
                    </button>
                </td>
            </tr>
        ))
    )
    return (
    <table className='w-full text-sm text-left text-gray-500'>
        <thead className='border-[1px]'>
        <tr >
            <th>写真</th>
            <th>数量</th>
            <th>値段</th>
            <th>削除</th>
        </tr>
        </thead>
        <tbody>
{renderItems}
        </tbody>
    </table>
  )
}

export default CartTable