import axios from 'axios';
import { authService } from './authService';

const API_URL = 'https://localhost:7000/api';

const getHeaders = () => {
  const token = authService.getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const apiService = {
  // Organizations
  getOrganizations: () => axios.get(`${API_URL}/organizations`, { headers: getHeaders() }),
  createOrganization: (data: any) => axios.post(`${API_URL}/organizations`, data, { headers: getHeaders() }),
  updateOrganization: (id: number, data: any) => axios.put(`${API_URL}/organizations/${id}`, data, { headers: getHeaders() }),
  deleteOrganization: (id: number) => axios.delete(`${API_URL}/organizations/${id}`, { headers: getHeaders() }),

  // Branches
  getBranches: () => axios.get(`${API_URL}/branches`, { headers: getHeaders() }),
  createBranch: (data: any) => axios.post(`${API_URL}/branches`, data, { headers: getHeaders() }),
  updateBranch: (id: number, data: any) => axios.put(`${API_URL}/branches/${id}`, data, { headers: getHeaders() }),
  deleteBranch: (id: number) => axios.delete(`${API_URL}/branches/${id}`, { headers: getHeaders() }),

  // Centers
  getCenters: () => axios.get(`${API_URL}/centers`, { headers: getHeaders() }),
  createCenter: (data: any) => axios.post(`${API_URL}/centers`, data, { headers: getHeaders() }),
  updateCenter: (id: number, data: any) => axios.put(`${API_URL}/centers/${id}`, data, { headers: getHeaders() }),
  deleteCenter: (id: number) => axios.delete(`${API_URL}/centers/${id}`, { headers: getHeaders() }),

  // Members
  getMembers: () => axios.get(`${API_URL}/members`, { headers: getHeaders() }),
  createMember: (data: any) => axios.post(`${API_URL}/members`, data, { headers: getHeaders() }),
  updateMember: (id: number, data: any) => axios.put(`${API_URL}/members/${id}`, data, { headers: getHeaders() }),
  deleteMember: (id: number) => axios.delete(`${API_URL}/members/${id}`, { headers: getHeaders() }),

  // Organization Users
  getOrganizationUsers: () => axios.get(`${API_URL}/organizationusers`, { headers: getHeaders() }),
  createOrganizationUser: (data: any) => axios.post(`${API_URL}/organizationusers`, data, { headers: getHeaders() }),
  updateOrganizationUser: (id: number, data: any) => axios.put(`${API_URL}/organizationusers/${id}`, data, { headers: getHeaders() }),
  deleteOrganizationUser: (id: number) => axios.delete(`${API_URL}/organizationusers/${id}`, { headers: getHeaders() }),

  // Branch Users
  getBranchUsers: () => axios.get(`${API_URL}/branchusers`, { headers: getHeaders() }),
  createBranchUser: (data: any) => axios.post(`${API_URL}/branchusers`, data, { headers: getHeaders() }),
  updateBranchUser: (id: number, data: any) => axios.put(`${API_URL}/branchusers/${id}`, data, { headers: getHeaders() }),
  deleteBranchUser: (id: number) => axios.delete(`${API_URL}/branchusers/${id}`, { headers: getHeaders() })
};

