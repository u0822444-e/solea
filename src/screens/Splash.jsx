import { useEffect } from 'react';
import { Sparkles, ArrowRight, LoaderCircle } from 'lucide-react';

export default function Splash({ onContinue }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onContinue(), 2200);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="splash-screen">
      <div className="splash-glow splash-glow-one" />
      <div className="splash-glow splash-glow-two" />
      <div className="splash-content">
        <div className="splash-logo"><span className="splash-icon"><Sparkles size={29} strokeWidth={1.5} /></span><span className="splash-wordmark">SOLEA</span><span className="splash-submark">BEAUTY</span></div>
        <p className="splash-kicker">YOUR EVERYDAY GLOW, CURATED</p>
        <h1>Make room<br />for <em>your glow.</em></h1>
        <p className="splash-copy">Thoughtful beauty essentials for the little rituals that make you feel like you.</p>
        <div className="splash-image"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90" alt="A curated collection of skincare products" /></div>
        <div className="splash-loading" role="status" aria-live="polite"><LoaderCircle className="splash-spinner" size={17} /><span>Preparing your beauty edit</span><span className="splash-dots">...</span></div>
        <button className="splash-skip" onClick={onContinue}>Continue now <ArrowRight size={14} /></button>
        <p className="splash-footer">A LITTLE MOMENT, JUST FOR YOU</p>
      </div>
    </div>
  );
}
