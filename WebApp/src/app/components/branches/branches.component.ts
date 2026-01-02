import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Branches</h2>
        <button (click)="showForm = !showForm" class="btn btn-primary" *ngIf="isOwner()">Add Branch</button>
        
        <div *ngIf="showForm" class="form-container">
          <h3>{{ editingBranch ? 'Edit' : 'Add' }} Branch</h3>
          <form (ngSubmit)="saveBranch()">
            <div class="form-group">
              <label>Name</label>
              <input [(ngModel)]="formData.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input [(ngModel)]="formData.address" name="address">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input [(ngModel)]="formData.phone" name="phone">
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
              <th>Address</th>
              <th>Phone</th>
              <th *ngIf="isOwner()">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let branch of branches">
              <td>{{ branch.branchId }}</td>
              <td>{{ branch.name }}</td>
              <td>{{ branch.address }}</td>
              <td>{{ branch.phone }}</td>
              <td *ngIf="isOwner()">
                <button (click)="editBranch(branch)" class="btn">Edit</button>
                <button (click)="deleteBranch(branch.branchId)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BranchesComponent implements OnInit {
  branches: any[] = [];
  showForm = false;
  editingBranch: any = null;
  formData = {
    name: '',
    address: '',
    phone: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  isOwner(): boolean {
    return this.authService.getCurrentUser()?.role === 'Owner';
  }

  loadBranches(): void {
    this.apiService.getBranches().subscribe(data => {
      this.branches = data;
    });
  }

  editBranch(branch: any): void {
    this.editingBranch = branch;
    this.formData = { ...branch };
    this.showForm = true;
  }

  saveBranch(): void {
    if (this.editingBranch) {
      this.apiService.updateBranch(this.editingBranch.branchId, this.formData)
        .subscribe(() => {
          this.loadBranches();
          this.cancelEdit();
        });
    } else {
      this.apiService.createBranch(this.formData)
        .subscribe(() => {
          this.loadBranches();
          this.cancelEdit();
        });
    }
  }

  deleteBranch(id: number): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.apiService.deleteBranch(id).subscribe(() => {
        this.loadBranches();
      });
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingBranch = null;
    this.formData = { name: '', address: '', phone: '' };
  }
}

