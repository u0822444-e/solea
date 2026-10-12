import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const CartContext = createContext(null);
export function CartProvider({children}) {
 const [cart,setCart] = useState(()=>{try{return JSON.parse(localStorage.getItem('solea-cart')||'[]')}catch{return []}});
 const [wishlist,setWishlist] = useState(()=>{try{return JSON.parse(localStorage.getItem('solea-wishlist')||'[]')}catch{return []}});
 useEffect(()=>localStorage.setItem('solea-cart',JSON.stringify(cart)),[cart]);
 useEffect(()=>localStorage.setItem('solea-wishlist',JSON.stringify(wishlist)),[wishlist]);
 const add=(product,size=38,color=product.color)=>setCart(old=>{const found=old.find(x=>x.id===product.id&&x.size===size&&x.color===color);return found?old.map(x=>x===found?{...x,qty:x.qty+1}:x):[...old,{...product,size,color,qty:1}]});
 const update=(id,size,delta)=>setCart(old=>old.map(x=>x.id===id&&x.size===size?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0));
 const remove=(id,size)=>setCart(old=>old.filter(x=>!(x.id===id&&x.size===size)));
 const toggleWish=id=>setWishlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
 const value=useMemo(()=>({cart,wishlist,add,update,remove,toggleWish,cartCount:cart.reduce((s,x)=>s+x.qty,0),subtotal:cart.reduce((s,x)=>s+x.price*x.qty,0)}),[cart,wishlist]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart=()=>useContext(CartContext);
