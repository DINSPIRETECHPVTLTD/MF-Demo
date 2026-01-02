import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <div class="dashboard-grid">
        <div class="card">
          <h3>Organizations</h3>
          <p class="stat">{{ stats.organizations }}</p>
        </div>
        <div class="card">
          <h3>Branches</h3>
          <p class="stat">{{ stats.branches }}</p>
        </div>
        <div class="card">
          <h3>Centers</h3>
          <p class="stat">{{ stats.centers }}</p>
        </div>
        <div class="card">
          <h3>Members</h3>
          <p class="stat">{{ stats.members }}</p>
        </div>
      </div>
      <div class="card">
        <h3>User Information</h3>
        <p><strong>Type:</strong> {{ user?.userType }}</p>
        <p><strong>Role:</strong> {{ user?.role }}</p>
        <p *ngIf="user?.organizationId"><strong>Organization ID:</strong> {{ user.organizationId }}</p>
        <p *ngIf="user?.branchId"><strong>Branch ID:</strong> {{ user.branchId }}</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .stat {
      font-size: 48px;
      font-weight: bold;
      color: #007bff;
      margin: 10px 0;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    organizations: 0,
    branches: 0,
    centers: 0,
    members: 0
  };
  user: any = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadStats();
  }

  loadStats(): void {
    this.apiService.getBranches().subscribe(branches => {
      this.stats.branches = branches.length;
    });
    this.apiService.getCenters().subscribe(centers => {
      this.stats.centers = centers.length;
    });
    this.apiService.getMembers().subscribe(members => {
      this.stats.members = members.length;
    });
    if (this.user?.role === 'Owner') {
      this.apiService.getOrganizations().subscribe(orgs => {
        this.stats.organizations = orgs.length;
      });
    }
  }
}

