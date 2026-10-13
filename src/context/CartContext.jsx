import {createContext,useContext,useEffect,useMemo,useState} from 'react';
const C=createContext(null);
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
export function CartProvider({children}){
const [cart,setCart]=useState(()=>read('solea-beauty-cart',[])),[wishlist,setWishlist]=useState(()=>read('solea-beauty-wishlist',[]));
useEffect(()=>localStorage.setItem('solea-beauty-cart',JSON.stringify(cart)),[cart]);
useEffect(()=>localStorage.setItem('solea-beauty-wishlist',JSON.stringify(wishlist)),[wishlist]);
const add=p=>setCart(old=>old.some(i=>i.id===p.id)?old.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...old,{...p,qty:1}]);
const update=(id,d)=>setCart(old=>old.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));
const remove=id=>setCart(old=>old.filter(i=>i.id!==id));
const toggleWish=id=>setWishlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
const value=useMemo(()=>({cart,wishlist,add,update,remove,toggleWish,cartCount:cart.reduce((s,i)=>s+i.qty,0),subtotal:cart.reduce((s,i)=>s+i.price*i.qty,0)}),[cart,wishlist]);
return <C.Provider value={value}>{children}</C.Provider>}
export const useCart=()=>useContext(C);
