import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunction';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const routes = [
  {to : '/login', name :'ログイン', auth : false},
  {to : '/register', name :'会員登録', auth : false},
  {to : '/product/upload', name :'アップロード', auth : true},
  {to : '/user/cart', name :'cart', auth : true, icon : <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} />},
  {to : '', name :'ログアウト', auth : true},
  {to : '/history', name :'注文内容', auth : true}
]
const NavItem = ({mobile}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state =>state.user?.userData?.cart);
  const isAuth = useSelector(state => state.user?.isAuth);
  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      })
  }
  return (
  <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-gray-900 h-full"}items-center`}>
    {routes.map(({to, name, auth,icon}) => {
      if(isAuth!==auth){
        return null;
      }
      if(name==='ログアウト'){
        return <li key ={name}className='py-2 text-center border-b-4 curser-pointer'><Link
        onClick = {handleLogout}
        >{name}</Link></li>
      }else if(icon){
        return <li className='relative py-2 text-center border-b-4 cursor-pointer' key = {name}>
          <Link to ={to}>
            {icon}
          <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3'>
          {cart?.length}  
          </span>
            </Link>
        </li>
      }

      else{
        return <li key ={name}className='py-2 text-center border-b-4 curser-pointer'><Link
        to = {to}
        >{name}</Link></li>
      }
    })}
  </ul>
  )
}

export default NavItem