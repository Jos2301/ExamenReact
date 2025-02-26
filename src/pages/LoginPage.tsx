import React, { useState } from 'react';
import '../assets/Index.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para controlar la animación
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState(''); // Puede ser '', 'loading' o 'ok'
  const [buttonState, setButtonState] = useState('Ingresar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Si ya está en proceso de animación, no hacer nada
    if (isAnimating) return;

    // Verificación de credenciales fijas
    if (username !== 'GrupoSalinas' || password !== '04963225') {
      alert('Credenciales incorrectas');
      return;
    }

    // Inicia la animación
    setIsAnimating(true);
    setAnimationClass('loading');
    setButtonState('Autenticando');

    // Después de 3 segundos cambia a estado "ok"
    setTimeout(() => {
      setAnimationClass('ok');
      setButtonState('Bienvenido!');

      // Tras 4 segundos se reinicia la animación y se procede con el login
      setTimeout(() => {
        setAnimationClass('');
        setButtonState('Ingresar');
        setIsAnimating(false);
        login(username);
        navigate('/employees');
      }, 1000);
    }, 1000);
  };

  // Función para evitar copiar/pegar en los inputs
  const handlePreventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <div className="LoginContainer wrapper">
      <div className="LoginWrapper">
        <h2 className="LoginTitulo">Log in</h2>
        {/* Se agrega la clase extra "login" para aplicar las animaciones definidas en el CSS */}
        <form className={`LoginForm login ${animationClass}`} onSubmit={handleSubmit}>
          <div className="LoginInputWrapper">
            <label className="LoginLablel">Usuario:</label>
            <input
              className="LoginInput"
              type="text"
              placeholder="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onCopy={handlePreventCopyPaste}
              onPaste={handlePreventCopyPaste}
              required
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="LoginInputWrapper">
            <label className="LoginLablel">Contraseña:</label>
            <input
              className="LoginInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onCopy={handlePreventCopyPaste}
              onPaste={handlePreventCopyPaste}
              required
            />
            <i className="fa fa-key"></i>
          </div>
          <button className="LoginButton" type="submit">
            <i className="spinner"></i>
            <span className="state">{buttonState}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
