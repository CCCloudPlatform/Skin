import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/" className="nav-logo-link">
        <div className="nav-logo">
          <span className="logo-text">CloudPlatform</span>
          <span className="logo-superscript">CLCL</span>
        </div>
      </Link>
      <div className="nav-links">
        {loggedIn ? (
          <button className="nav-button" onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <span onClick={openLoginModal} className="login-link">이미 계정이 있으신가요?</span>
            <button className="nav-button primary" onClick={openSignupModal}>GET STARTED</button>
          </>
        )}
      </div>
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="modal login-modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">로그인</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              name="username" 
              placeholder="아이디" 
              value={loginForm.username}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              name="password" 
              placeholder="비밀번호" 
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginForm.rememberMe}
                onChange={handleLoginChange}
              />
              <span>로그인 정보 저장</span>
            </label>
          </div>
          <button type="submit" className="submit-button">로그인</button>
        </form>
        <button onClick={closeLoginModal} className="close-button">닫기</button>
      </Modal>
      <Modal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
        contentLabel="Signup Modal"
        className="modal signup-modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">회원가입</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={signupForm.name}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="role"
              placeholder="직위"
              value={signupForm.role}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="input-group id-check-container">
            <input
              type="text"
              name="id"
              placeholder="아이디"
              value={signupForm.id}
              onChange={handleSignupChange}
              required
            />
            <button type="button" onClick={handleCheckIdDuplicate} className="id-check-button">중복확인</button>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">가입하기</button>
        </form>
        <button onClick={closeSignupModal} className="close-button">닫기</button>
      </Modal>
    </nav>
  );
}

export default Nav;
