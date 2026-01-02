import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1>MF Demo</h1>
          <nav *ngIf="isAuthenticated()">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/organizations" routerLinkActive="active" *ngIf="isOwner()">Organizations</a>
            <a routerLink="/branches" routerLinkActive="active">Branches</a>
            <a routerLink="/centers" routerLinkActive="active">Centers</a>
            <a routerLink="/members" routerLinkActive="active">Members</a>
            <button (click)="logout()" class="btn-logout">Logout</button>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #007bff;
      color: white;
      padding: 15px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    nav {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    nav a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    nav a:hover, nav a.active {
      background-color: rgba(255,255,255,0.2);
    }
    .btn-logout {
      background-color: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid white;
      padding: 5px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-logout:hover {
      background-color: rgba(255,255,255,0.3);
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isOwner(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'Owner';
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}

