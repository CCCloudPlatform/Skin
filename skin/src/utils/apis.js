import axios from 'axios';

const API_URL = 'https://your-api-url.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials, rememberMe) => {
  try {
    const response = await api.post('/login', credentials);
    const { token } = response.data;
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkIdDuplicate = async (id) => {
  try {
    const response = await api.get(`/check-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const fetchPrivateNetworks = async () => {
  // Implement the API call to fetch private networks
  // This is a placeholder implementation
  return [
    {
      id: 1,
      name: 'Network 1',
      cidr: '192.168.1.0/24',
    },
    {
      id: 2,
      name: 'Network 2',
      cidr: '10.0.0.0/24',
    },
  ];
};

export const fetchVMList = async () => {
  // Implement the API call to fetch VM list
  // This is a placeholder implementation
  return [
    {
      id: 1,
      name: 'VM 1',
      flavor: 'Standard',
      keypairName: 'key1',
      securityGroups: ['default'],
      status: 'Active',
      network: '192.168.1.10',
      networkId: 1
    },
    {
      id: 2,
      name: 'VM 2',
      flavor: 'Large',
      keypairName: 'key2',
      securityGroups: ['default', 'web'],
      status: 'Active',
      network: '192.168.1.11',
      networkId: 1
    },
    {
      id: 3,
      name: 'VM 3',
      flavor: 'Medium',
      keypairName: 'key3',
      securityGroups: ['default'],
      status: 'Stopped',
      network: '10.0.0.5',
      networkId: 2
    },
  ];
};

export const fetchFloatingIPs = async () => {
  // This is a placeholder implementation
  return [
    { id: 1, address: '203.0.113.1', status: '사용가능' },
    { id: 2, address: '203.0.113.2', status: '사용중' },
    { id: 3, address: '203.0.113.3', status: '신청완료' },
    { id: 4, address: '203.0.113.4', status: '거절됨' },
  ];
};

export const fetchSecurityGroups = async () => {
  // 실제 API 호출을 구현할 때까지 이 더미 데이터를 사용합니다.
  return [
    {
      id: 1,
      name: 'Default',
      policies: [
        { id: 1, description: 'Allow SSH (Port 22)' },
        { id: 2, description: 'Allow HTTP (Port 80)' },
        { id: 3, description: 'Allow HTTPS (Port 443)' }
      ]
    },
    {
      id: 2,
      name: 'Web Servers',
      policies: [
        { id: 4, description: 'Allow HTTP (Port 80)' },
        { id: 5, description: 'Allow HTTPS (Port 443)' },
        { id: 6, description: 'Allow MySQL (Port 3306)' }
      ]
    },
    {
      id: 3,
      name: 'Database Servers',
      policies: [
        { id: 7, description: 'Allow MySQL (Port 3306)' },
        { id: 8, description: 'Allow PostgreSQL (Port 5432)' }
      ]
    }
  ];
};

export default api;
