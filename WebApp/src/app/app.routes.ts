import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CentersComponent } from './components/centers/centers.component';
import { MembersComponent } from './components/members/members.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'organizations', component: OrganizationsComponent, canActivate: [AuthGuard] },
  { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard] },
  { path: 'centers', component: CentersComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

