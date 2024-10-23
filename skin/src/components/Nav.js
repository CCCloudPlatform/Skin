import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/Nav.css';
import { login, register, checkIdDuplicate, logout, isLoggedIn } from '../utils/apis';

Modal.setAppElement('#root');

function Nav() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '', rememberMe: false });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    role: '',
    id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);
  const openSignupModal = () => setSignupModalIsOpen(true);
  const closeSignupModal = () => setSignupModalIsOpen(false);

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm, loginForm.rememberMe);
      setLoggedIn(true);
      closeLoginModal();
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await register(signupForm);
      closeSignupModal();
      // Handle successful registration (e.g., show success message, open login modal)
    } catch (error) {
      setError('Registration failed: ' + error.message);
    }
  };

  const handleCheckIdDuplicate = async () => {
    try {
      const result = await checkIdDuplicate(signupForm.id);
      if (result.isAvailable) {
        alert('This ID is available');
      } else {
        alert('This ID is already taken');
      }
    } catch (error) {
      setError('ID check failed: ' + error.message);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">Logo</div>
      <div className="nav-links">
        {loggedIn ? (
          <button className="nav-button" onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <span onClick={openLoginModal} className="login-link">이미 계정이 있으신가요?</span>
            <button className="nav-button primary" onClick={openSignupModal}>Get Started</button>
          </>
        )}
      </div>
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>로그인</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={loginForm.username}
            onChange={handleLoginChange}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={loginForm.password}
            onChange={handleLoginChange}
          />
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={loginForm.rememberMe}
              onChange={handleLoginChange}
            />
            로그인 정보 저장
          </label>
          <button type="submit">로그인</button>
        </form>
        <button onClick={closeLoginModal}>닫기</button>
      </Modal>
      <Modal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
        contentLabel="Signup Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>회원가입</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={signupForm.name}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="직위(Role)"
            value={signupForm.role}
            onChange={handleSignupChange}
            required
          />
          <div className="id-check-container">
            <input
              type="text"
              name="id"
              placeholder="아이디 (ID)"
              value={signupForm.id}
              onChange={handleSignupChange}
              required
            />
            <button type="button" onClick={handleCheckIdDuplicate}>중복체크</button>
          </div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 (PW)"
            value={signupForm.password}
            onChange={handleSignupChange}
            required
          />
          <button type="submit">회원가입</button>
        </form>
        <button onClick={closeSignupModal}>닫기</button>
      </Modal>
    </nav>
  );
}

export default Nav;
