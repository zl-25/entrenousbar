import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0D10] flex flex-col justify-center items-center p-4 relative">
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-[#8A8D98] hover:text-[#00E35F] flex items-center gap-2 font-medium transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Retour au site
      </Link>
      
      <div className="w-full max-w-md bg-[#1A1D24] border border-[#2A2D36] rounded-2xl p-8 shadow-2xl relative overflow-hidden mt-12 md:mt-0">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00E35F]/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <img 
              src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png" 
              alt="Logo" 
              className="h-16 mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold text-white mb-2">Administration</h1>
            <p className="text-sm text-[#8A8D98]">Connectez-vous pour accéder à votre espace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-[#8A8D98] mb-2">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <iconify-icon icon="lucide:mail" class="text-[#8A8D98] text-lg"></iconify-icon>
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#111317] border border-[#2A2D36] rounded-xl text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] transition-all"
                  placeholder="admin@entrenous.ga"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-[#8A8D98] mb-2">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#8A8D98]" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-[#111317] border border-[#2A2D36] rounded-xl text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8A8D98] hover:text-white"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#00E35F] hover:bg-green-400 text-black font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,227,95,0.3)] hover:shadow-[0_0_20px_rgba(0,227,95,0.5)] flex items-center justify-center gap-2"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
