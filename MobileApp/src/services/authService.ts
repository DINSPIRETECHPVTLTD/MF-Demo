import axios from 'axios';

const API_URL = 'https://localhost:7000/api';

export interface AuthResponse {
  token: string;
  userType: string;
  userId: number;
  organizationId?: number;
  branchId?: number;
  role: string;
}

class AuthService {
  login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response.data;
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  getStoredUser = (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  isAuthenticated = (): boolean => {
    return !!this.getToken();
  };
}

export const authService = new AuthService();

