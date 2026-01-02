import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Centers</h2>
        <button (click)="showForm = !showForm" class="btn btn-primary" *ngIf="isBranchUser()">Add Center</button>
        
        <div *ngIf="showForm" class="form-container">
          <h3>{{ editingCenter ? 'Edit' : 'Add' }} Center</h3>
          <form (ngSubmit)="saveCenter()">
            <div class="form-group">
              <label>Name</label>
              <input [(ngModel)]="formData.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="formData.description" name="description"></textarea>
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
              <th>Description</th>
              <th *ngIf="isBranchUser()">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let center of centers">
              <td>{{ center.centerId }}</td>
              <td>{{ center.name }}</td>
              <td>{{ center.description }}</td>
              <td *ngIf="isBranchUser()">
                <button (click)="editCenter(center)" class="btn">Edit</button>
                <button (click)="deleteCenter(center.centerId)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CentersComponent implements OnInit {
  centers: any[] = [];
  showForm = false;
  editingCenter: any = null;
  formData = {
    name: '',
    description: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCenters();
  }

  isBranchUser(): boolean {
    return this.authService.getCurrentUser()?.role === 'BranchUser';
  }

  loadCenters(): void {
    this.apiService.getCenters().subscribe(data => {
      this.centers = data;
    });
  }

  editCenter(center: any): void {
    this.editingCenter = center;
    this.formData = { ...center };
    this.showForm = true;
  }

  saveCenter(): void {
    if (this.editingCenter) {
      this.apiService.updateCenter(this.editingCenter.centerId, this.formData)
        .subscribe(() => {
          this.loadCenters();
          this.cancelEdit();
        });
    } else {
      this.apiService.createCenter(this.formData)
        .subscribe(() => {
          this.loadCenters();
          this.cancelEdit();
        });
    }
  }

  deleteCenter(id: number): void {
    if (confirm('Are you sure you want to delete this center?')) {
      this.apiService.deleteCenter(id).subscribe(() => {
        this.loadCenters();
      });
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingCenter = null;
    this.formData = { name: '', description: '' };
  }
}

