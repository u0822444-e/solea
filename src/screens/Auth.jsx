import { useState } from 'react';
import { Sparkles, Eye, EyeOff, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function Auth({ onSuccess }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function changeMode(next) {
    setMode(next);
    setError('');
    setSent(false);
  }

  function submit(event) {
    event.preventDefault();
    setError('');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (mode === 'forgot') {
      setSent(true);
      return;
    }
    if (password.length < 8) {
      setError('Your password must be at least 8 characters.');
      return;
    }
    if (mode === 'create' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (mode === 'create' && password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    onSuccess(mode === 'create' ? name.trim() : (name.trim() || email.split('@')[0]));
  }

  const titles = {
    signin: { eyebrow: 'WELCOME BACK', title: 'Hello again, lovely.', copy: 'Sign in to pick up where your beauty ritual left off.' },
    create: { eyebrow: 'YOUR BEAUTY JOURNEY STARTS HERE', title: 'Create your account.', copy: 'Join SOLEA for a little more glow in your everyday.' },
    forgot: { eyebrow: 'NO WORRIES', title: 'Let’s get you back in.', copy: 'Enter the email linked to your account and we’ll guide you through the next step.' },
  };
  const heading = titles[mode];

  return (
    <div className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand"><span className="auth-brand-icon"><Sparkles size={19} /></span> SOLEA <span className="auth-brand-sub">BEAUTY</span></div>
        <div className="auth-art">
          <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85" alt="Skincare and beauty essentials" />
          <div className="auth-art-overlay"><span>YOUR DAILY RITUAL</span><h2>A little glow.<br /><i>A lot of you.</i></h2><p>Thoughtfully picked beauty for your everyday.</p></div>
        </div>
        <p className="auth-visual-foot">YOUR MOMENT. YOUR RITUAL. YOUR GLOW.</p>
      </section>

      <section className="auth-panel">
        {mode !== 'signin' && <button type="button" className="auth-back" onClick={() => changeMode('signin')}><ArrowLeft size={16} /> Back to sign in</button>}
        <div className="auth-heading"><p className="eyebrow">{heading.eyebrow}</p><h1>{heading.title}</h1><p>{heading.copy}</p></div>

        {mode === 'forgot' && sent ? (
          <div className="auth-confirmation"><span><CheckCircle2 size={30} /></span><h2>Check your inbox</h2><p>If an account exists for <strong>{email}</strong>, password reset instructions would be sent there. This prototype does not send real emails.</p><button className="primary-button full" onClick={() => changeMode('signin')}>Return to sign in</button></div>
        ) : (
          <form className="auth-form" onSubmit={submit}>
            {mode === 'create' && <label>Full name<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></label>}
            <label>Email address<input autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
            {mode !== 'forgot' && <label>Password<div className="password-field"><input autoComplete={mode === 'create' ? 'new-password' : 'current-password'} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'create' ? 'At least 8 characters' : 'Enter your password'} required minLength={8} /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>}
            {mode === 'create' && <label>Confirm password<input autoComplete="new-password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required minLength={8} /></label>}
            {mode === 'signin' && <div className="auth-inline"><span>Welcome back</span><button type="button" className="text-link" onClick={() => changeMode('forgot')}>Forgot password?</button></div>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button full auth-submit" type="submit">{mode === 'signin' ? 'Sign in' : mode === 'create' ? 'Create account' : 'Send reset instructions'} {mode === 'forgot' && <Mail size={16} />}</button>
          </form>
        )}

        {mode !== 'forgot' && <p className="auth-switch">{mode === 'signin' ? 'New to SOLEA?' : 'Already have an account?'} <button type="button" className="text-link" onClick={() => changeMode(mode === 'signin' ? 'create' : 'signin')}>{mode === 'signin' ? 'Create account' : 'Sign in'}</button></p>}
        <p className="auth-terms">Demo experience only. Account creation, sign-in, and password recovery are not connected to a real authentication service.</p>
      </section>
    </div>
  );
}
