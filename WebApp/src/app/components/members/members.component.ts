import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Members</h2>
        <button (click)="showForm = !showForm" class="btn btn-primary" *ngIf="canCreateMember()">Add Member</button>
        
        <div *ngIf="showForm" class="form-container">
          <h3>{{ editingMember ? 'Edit' : 'Add' }} Member</h3>
          <form (ngSubmit)="saveMember()">
            <div class="form-group">
              <label>First Name</label>
              <input [(ngModel)]="formData.firstName" name="firstName" required>
            </div>
            <div class="form-group">
              <label>Middle Name</label>
              <input [(ngModel)]="formData.middleName" name="middleName">
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input [(ngModel)]="formData.lastName" name="lastName" required>
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" [(ngModel)]="formData.dob" name="dob">
            </div>
            <div class="form-group">
              <label>Age</label>
              <input type="number" [(ngModel)]="formData.age" name="age">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input [(ngModel)]="formData.phone" name="phone">
            </div>
            <div class="form-group">
              <label>Address</label>
              <input [(ngModel)]="formData.address" name="address">
            </div>
            <div class="form-group">
              <label>Aadhaar</label>
              <input [(ngModel)]="formData.aadhaar" name="aadhaar">
            </div>
            <div class="form-group">
              <label>Occupation</label>
              <input [(ngModel)]="formData.occupation" name="occupation">
            </div>
            <div class="form-group" *ngIf="isBranchUser()">
              <label>Center</label>
              <select [(ngModel)]="formData.centerId" name="centerId">
                <option [value]="null">None</option>
                <option *ngFor="let center of centers" [value]="center.centerId">{{ center.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" (click)="cancelEdit()" class="btn">Cancel</button>
          </form>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Center</th>
              <th *ngIf="isBranchUser()">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let member of members">
              <td>{{ member.memberId }}</td>
              <td>{{ member.firstName }} {{ member.middleName }} {{ member.lastName }}</td>
              <td>{{ member.phone }}</td>
              <td>{{ member.age }}</td>
              <td>{{ member.center?.name || 'N/A' }}</td>
              <td *ngIf="isBranchUser()">
                <button (click)="editMember(member)" class="btn">Edit</button>
                <button (click)="deleteMember(member.memberId)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class MembersComponent implements OnInit {
  members: any[] = [];
  centers: any[] = [];
  showForm = false;
  editingMember: any = null;
  formData: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: null,
    age: null,
    phone: '',
    address: '',
    aadhaar: '',
    occupation: '',
    centerId: null
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
    if (this.isBranchUser()) {
      this.loadCenters();
    }
  }

  canCreateMember(): boolean {
    const role = this.authService.getCurrentUser()?.role;
    return role === 'BranchUser' || role === 'Staff';
  }

  isBranchUser(): boolean {
    return this.authService.getCurrentUser()?.role === 'BranchUser';
  }

  loadMembers(): void {
    this.apiService.getMembers().subscribe(data => {
      this.members = data;
    });
  }

  loadCenters(): void {
    this.apiService.getCenters().subscribe(data => {
      this.centers = data;
    });
  }

  editMember(member: any): void {
    this.editingMember = member;
    this.formData = { ...member };
    if (member.dob) {
      this.formData.dob = new Date(member.dob).toISOString().split('T')[0];
    }
  }

  saveMember(): void {
    if (this.editingMember) {
      this.apiService.updateMember(this.editingMember.memberId, this.formData)
        .subscribe(() => {
          this.loadMembers();
          this.cancelEdit();
        });
    } else {
      this.apiService.createMember(this.formData)
        .subscribe(() => {
          this.loadMembers();
          this.cancelEdit();
        });
    }
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.apiService.deleteMember(id).subscribe(() => {
        this.loadMembers();
      });
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingMember = null;
    this.formData = {
      firstName: '',
      middleName: '',
      lastName: '',
      dob: null,
      age: null,
      phone: '',
      address: '',
      aadhaar: '',
      occupation: '',
      centerId: null
    };
  }
}

