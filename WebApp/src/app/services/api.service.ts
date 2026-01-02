import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Organizations
  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/organizations`, { headers: this.getHeaders() });
  }

  getOrganization(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/organizations/${id}`, { headers: this.getHeaders() });
  }

  createOrganization(org: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/organizations`, org, { headers: this.getHeaders() });
  }

  updateOrganization(id: number, org: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/organizations/${id}`, org, { headers: this.getHeaders() });
  }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/organizations/${id}`, { headers: this.getHeaders() });
  }

  // Organization Users
  getOrganizationUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/organizationusers`, { headers: this.getHeaders() });
  }

  createOrganizationUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/organizationusers`, user, { headers: this.getHeaders() });
  }

  updateOrganizationUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/organizationusers/${id}`, user, { headers: this.getHeaders() });
  }

  deleteOrganizationUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/organizationusers/${id}`, { headers: this.getHeaders() });
  }

  // Branches
  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branches`, { headers: this.getHeaders() });
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/branches`, branch, { headers: this.getHeaders() });
  }

  updateBranch(id: number, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/branches/${id}`, branch, { headers: this.getHeaders() });
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/branches/${id}`, { headers: this.getHeaders() });
  }

  // Branch Users
  getBranchUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branchusers`, { headers: this.getHeaders() });
  }

  createBranchUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/branchusers`, user, { headers: this.getHeaders() });
  }

  updateBranchUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/branchusers/${id}`, user, { headers: this.getHeaders() });
  }

  deleteBranchUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/branchusers/${id}`, { headers: this.getHeaders() });
  }

  // Centers
  getCenters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/centers`, { headers: this.getHeaders() });
  }

  createCenter(center: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/centers`, center, { headers: this.getHeaders() });
  }

  updateCenter(id: number, center: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/centers/${id}`, center, { headers: this.getHeaders() });
  }

  deleteCenter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/centers/${id}`, { headers: this.getHeaders() });
  }

  // Members
  getMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/members`, { headers: this.getHeaders() });
  }

  createMember(member: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/members`, member, { headers: this.getHeaders() });
  }

  updateMember(id: number, member: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/members/${id}`, member, { headers: this.getHeaders() });
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/members/${id}`, { headers: this.getHeaders() });
  }

  // Guardians
  getGuardians(memberId?: number): Observable<any[]> {
    const url = memberId 
      ? `${this.apiUrl}/guardians/Member/${memberId}`
      : `${this.apiUrl}/guardians`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  createGuardian(guardian: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardians`, guardian, { headers: this.getHeaders() });
  }

  updateGuardian(id: number, guardian: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/guardians/${id}`, guardian, { headers: this.getHeaders() });
  }

  deleteGuardian(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/guardians/${id}`, { headers: this.getHeaders() });
  }
}

