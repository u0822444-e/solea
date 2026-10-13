import {Smartphone,Tablet} from 'lucide-react';
export default function DeviceFrames({device,setDevice}){return <div className="device-switch"><button className={device==='mobile'?'active':''} onClick={()=>setDevice('mobile')}><Smartphone size={15}/> Mobile</button><button className={device==='ipad'?'active':''} onClick={()=>setDevice('ipad')}><Tablet size={15}/> iPad</button></div>}
