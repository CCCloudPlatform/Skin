import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faCubes, faRocket, faCamera } from '@fortawesome/free-solid-svg-icons';
import '../styles/ServiceOverview.css';

function ServiceOverview() {
  const services = [
    {
      title: 'VMs',
      description: 'VM을 생성할 수 있습니다.',
      icon: <FontAwesomeIcon icon={faMicrochip} />
    },
    {
      title: 'K8s',
      description: 'K8s 클러스터를 생성할 수 있습니다.',
      icon: <FontAwesomeIcon icon={faCubes} />
    },
    {
      title: 'IaC Deploy',
      description: '지정한 환경을 안전하게 배포할 수 있습니다.',
      icon: <FontAwesomeIcon icon={faRocket} />
    },
    {
      title: 'Snapshot',
      description: '반복적으로 생성하는 VM의 스냅샷을 찍어 양산해보세요.',
      icon: <FontAwesomeIcon icon={faCamera} />
    }
  ];

  return (
    <div className="service-overview-page">
      <Nav />
      <main className="service-overview-content">
        <h1>서비스 개요</h1>
        <div className="service-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ServiceOverview;