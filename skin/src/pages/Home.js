import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const contributors = [
    { name: "Kwon Sun Jae", image: "https://avatars.githubusercontent.com/u/32411719?v=4" },
    { name: "AhnCoder", image: "https://avatars.githubusercontent.com/u/88716899?v=4" },
    { name: "김태헌", image: "https://avatars.githubusercontent.com/u/57055730?v=4" },
    { name: "jjaegi", image: "https://avatars.githubusercontent.com/u/77189999?v=4" },
    { name: "SeungWook Lee", image: "https://avatars.githubusercontent.com/u/68508835?v=4" },
    { name: "tjdgns8439", image: "https://avatars.githubusercontent.com/u/100510247?v=4" },
    { name: "zzu-yaaa", image: "https://avatars.githubusercontent.com/u/110540359?v=4" },
    // 더 많은 기여자를 추가할 수 있습니다.
  ];

  return (
    <div className="home">
      <Nav isLoggedIn={false} />
      <main className={`home-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero">
          <h1 className="hero-title">CloudPlatform</h1>
          <p className="hero-subtitle">Can you create faster than me?</p>
        </div>
        <div className="contributors-section">
          <h2>Contributors</h2>
          <div className="contributors-grid">
            {contributors.map((contributor, index) => (
              <div key={index} className="contributor-card" style={{animationDelay: `${index * 0.1}s`}}>
                <img src={contributor.image} alt={contributor.name} />
                <p>{contributor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
