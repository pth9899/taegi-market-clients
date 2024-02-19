import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../../components/FileUpload'
const continents = [
  { key: 1, value: '東京都' },
  { key: 2, value: '埼玉県' },
  { key: 3, value: '千葉県' },
  { key: 4, value: '愛知県' },
  { key: 5, value: '沖縄県' },
  { key: 6, value: '福岡県' },
  { key: 7, value: '大阪府' },
  { key: 8, value: '名古屋市' },
]

const UploadProductPage = () => {

const handleDrop = async(files) => {
  let formData = new FormData();
  const config = {
    header : {'content-type' :'multipart/form-data'}
  }
  formData.append('file', files[0]);
  try{
   const response = await axiosInstance.post('/products/image',formData, config);
  onImageChange([...images, response.data.fileName]);
  }catch(error){
    console.error(error);
  }
}

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    continents: 1,
    images: []
  })


  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate()

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body);
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <section>
      <div className='text-center m-7'>
        <h1>商品アップロード</h1>
      </div>
      <form className='mt-6' onSubmit={handleSubmit}>
        <FileUpload images={product.images} onImageChange={handleImages} />

        <div className='mt-4'>
          <label htmlFor='title'>名前</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='title'
            id='title'
            onChange={handleChange}
            value={product.title}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='description'>説明</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='description'
            id='description'
            onChange={handleChange}
            value={product.description}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='price'>値段</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='price'
            type='number'
            id='price'
            onChange={handleChange}
            value={product.price}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='continents'>地域</label>
          <select
            className='w-full px-4 mt-2 bg-white border rounded-md'
            name='continents'
            id='continents'
            onChange={handleChange}
            value={product.continents}
          >
            {continents.map(item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>
        <div className='mt-4'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700'>
            登録
          </button>
        </div>
      </form>
    </section>
  )
}

export default UploadProductPage