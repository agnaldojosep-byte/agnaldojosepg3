import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  LogOut,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut
} from '../lib/firebase';
import { audio } from './AudioEngine';
import { Language } from '../types';

interface AuthModalProps {
  lang: Language;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export function AuthModal({ lang, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status and feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Translations dictionary
  const t = {
    pt: {
      title: 'Portal das Estrelas 🌟',
      subtitle: 'Entre ou crie sua conta para salvar suas preferências e historinhas preferidas',
      email: 'E-mail mágico',
      password: 'Senha secreta',
      name: 'Nome do amiguinho',
      loginBtn: 'Entrar na Aventura',
      registerBtn: 'Criar Minha Conta',
      googleBtn: 'Entrar com o Google',
      noAccount: 'Ainda não tem conta?',
      alreadyAccount: 'Já possui uma conta?',
      or: 'ou escolha o portal',
      invalidEmail: 'Por favor, insira um e-mail válido.',
      loadingMsg: 'Consultando o portal mágico...',
      weakPassword: 'A senha secreta deve ter ao menos 6 caracteres.',
      successLogin: 'Beleza! Portal aberto com sucesso! ✨',
      successRegister: 'Conta criada com sucesso! Boas-vindas ao Reino!',
      forgotPass: 'Esqueceu a senha?',
    },
    en: {
      title: 'Starlight Portal 🌟',
      subtitle: 'Sign in or sign up to save your progress and favorite magical fairy tales',
      email: 'Magical Email',
      password: 'Secret Password',
      name: 'Adventurer Name',
      loginBtn: 'Enter the Adventure',
      registerBtn: 'Create My Account',
      googleBtn: 'Sign In with Google',
      noAccount: 'Don\'t have an account?',
      alreadyAccount: 'Already have an account?',
      or: 'or choose a portal',
      invalidEmail: 'Please enter a valid email address.',
      loadingMsg: 'Consulting the magic portal...',
      weakPassword: 'Your secret password must be at least 6 characters.',
      successLogin: 'Awesome! Portal unlocked successfully! ✨',
      successRegister: 'Account created! Welcome to the Kingdom!',
      forgotPass: 'Forgot password?',
    }
  };

  const curr = t[lang === 'pt' ? 'pt' : 'en'];

  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleGoogleSignIn = async () => {
    audio.playSystemPop();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        audio.playMagicChime();
        setSuccessMsg(curr.successLogin);
        setTimeout(() => {
          onAuthSuccess(result.user);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      // Clean up common error messages
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg(lang === 'pt' ? 'O portal do Google foi fechado antes de completar.' : 'Google popup closed before completion.');
      } else {
        setErrorMsg(err.message || 'Error executing Google Login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    audio.playSystemPop();

    if (!email.trim() || !password.trim()) {
      setErrorMsg(lang === 'pt' ? 'Por favor, preencha todos os campos.' : 'Please fill all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg(curr.invalidEmail);
      return;
    }

    if (password.length < 6) {
      setErrorMsg(curr.weakPassword);
      return;
    }

    if (activeTab === 'register' && !displayName.trim()) {
      setErrorMsg(lang === 'pt' ? 'Por favor, escolha um nome de aventureiro.' : 'Please choose an adventurer name.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (activeTab === 'login') {
        // Sign In
        const credential = await signInWithEmailAndPassword(auth, email, password);
        audio.playMagicChime();
        setSuccessMsg(curr.successLogin);
        setTimeout(() => {
          onAuthSuccess(credential.user);
          onClose();
        }, 1200);
      } else {
        // Register / Sign Up
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        // Save display name to profile
        await updateProfile(credential.user, {
          displayName: displayName
        });
        audio.playMagicChime();
        setSuccessMsg(curr.successRegister);
        setTimeout(() => {
          onAuthSuccess(credential.user);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      // Friendly messages for kids/parents
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg(lang === 'pt' ? 'E-mail ou senha secreta incorretos.' : 'Magical email or secret password incorrect.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg(lang === 'pt' ? 'Este e-mail mágico já está cadastrado.' : 'This magial email is already registered.');
      } else {
        setErrorMsg(err.message || 'Authentication error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 select-none"
      id="auth-modal-overlay"
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-[#1D271A] border-2 border-[#34422F] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden text-slate-100"
        id="auth-modal-card"
      >
        {/* Enchanted background lights */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header section */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-sky-305 to-pink-300 flex items-center gap-1.5">
              <span>{curr.title}</span>
            </h2>
            <p className="text-xs text-sky-200 leading-normal max-w-sm font-semibold">
              {curr.subtitle}
            </p>
          </div>
          <button
            onClick={() => {
              audio.playSystemPop();
              onClose();
            }}
            className="p-1.5 bg-[#283624] hover:bg-[#34422F] border border-[#3E5039] rounded-full text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Close"
            id="close-auth-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#141A10]/70 rounded-2xl border border-[#34422F] mb-6">
          <button
            onClick={() => {
              audio.playSystemPop();
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-fredoka font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] text-white shadow-md'
                : 'text-sky-305 hover:text-white hover:bg-slate-900/30'
            }`}
          >
            {lang === 'pt' ? 'Entrar' : 'Sign In'}
          </button>
          <button
            onClick={() => {
              audio.playSystemPop();
              setActiveTab('register');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-fredoka font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-gradient-to-r from-[#8FA88B] to-[#5D7A58] text-white shadow-md'
                : 'text-sky-305 hover:text-white hover:bg-slate-900/30'
            }`}
          >
            {lang === 'pt' ? 'Criar Conta' : 'Sign Up'}
          </button>
        </div>

        {/* Status Alerts */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 p-3 bg-red-950/50 border border-red-800 rounded-xl flex items-center gap-2.5 text-xs text-red-300 leading-normal"
              id="auth-error-alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 animate-pulse" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 leading-normal"
              id="auth-success-alert"
            >
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <form onSubmit={handlePasswordAuth} className="space-y-4">
          <AnimatePresence initial={false}>
            {activeTab === 'register' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1.5"
                key="name-field"
              >
                <label className="text-[10px] uppercase font-bold tracking-widest text-sky-200 block pl-1">
                  {curr.name}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-sky-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required={activeTab === 'register'}
                    placeholder={lang === 'pt' ? 'Ex: Dudu, Sofia...' : 'e.g. Leo, Nina...'}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-[#141A10]/70 border border-[#34422F] focus:border-[#8FA88B] focus:ring-1 focus:ring-[#8FA88B] rounded-xl font-sans text-xs outline-none transition-all placeholder:text-slate-500 text-slate-100"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-sky-200 block pl-1">
              {curr.email}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-sky-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-[#141A10]/70 border border-[#34422F] focus:border-[#8FA88B] focus:ring-1 focus:ring-[#8FA88B] rounded-xl font-sans text-xs outline-none transition-all placeholder:text-slate-500 text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-sky-200 block">
                {curr.password}
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-sky-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 bg-[#141A10]/70 border border-[#34422F] focus:border-[#8FA88B] focus:ring-1 focus:ring-[#8FA88B] rounded-xl font-sans text-xs outline-none transition-all placeholder:text-slate-500 text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sky-400 hover:text-white cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Core submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#8FA88B] via-[#D2E3C8] to-[#FFCC00] disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed font-fredoka font-black text-xs uppercase tracking-widest text-[#141A10] rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            id="auth-submit-btn"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{curr.loadingMsg}</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-250 animate-pulse" />
                <span>{activeTab === 'login' ? curr.loginBtn : curr.registerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#34422F]" />
          </div>
          <span className="relative z-10 px-3 bg-[#1D271A] text-[9px] uppercase font-bold tracking-widest text-[#C2D9C2]">
            {curr.or}
          </span>
        </div>

        {/* Google sign-in option */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full py-3 bg-[#141A10] hover:bg-[#1D271A] border-2 border-[#34422F] rounded-2xl text-xs font-semibold text-slate-100 cursor-pointer transition-all flex items-center justify-center gap-3 active:scale-95 shadow-inner"
          id="google-login-btn"
        >
          {/* SVG Google icon */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-sans font-bold">{curr.googleBtn}</span>
        </button>

        {/* Footer selector text toggle */}
        <div className="mt-6 text-center text-xs text-sky-200">
          <span>{activeTab === 'login' ? curr.noAccount : curr.alreadyAccount} </span>
          <button
            onClick={() => {
              audio.playSystemPop();
              setActiveTab(activeTab === 'login' ? 'register' : 'login');
              setErrorMsg('');
            }}
            className="text-amber-300 font-bold hover:underline cursor-pointer ml-1"
          >
            {activeTab === 'login' ? (lang === 'pt' ? 'Cadastre-se' : 'Register Now') : (lang === 'pt' ? 'Entrar' : 'Sign In')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
