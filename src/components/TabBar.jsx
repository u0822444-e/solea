import {House,Search,Heart,ShoppingBag,UserRound} from 'lucide-react';
const tabs=[['Home',House],['Explore',Search],['Wishlist',Heart],['Bag',ShoppingBag],['Profile',UserRound]];
export default function TabBar({active,onNavigate,cartCount}){return <nav className="tab-bar">{tabs.map(([n,I])=><button key={n} className={active===n?'selected':''} onClick={()=>onNavigate(n)}><span className="tab-icon"><I size={19}/>{n==='Bag'&&cartCount>0&&<i>{cartCount}</i>}</span><span>{n}</span></button>)}</nav>}
