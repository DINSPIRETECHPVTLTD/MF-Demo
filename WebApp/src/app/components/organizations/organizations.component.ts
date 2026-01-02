import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Organizations</h2>
        <button (click)="showForm = !showForm" class="btn btn-primary">Add Organization</button>
        
        <div *ngIf="showForm" class="form-container">
          <h3>{{ editingOrg ? 'Edit' : 'Add' }} Organization</h3>
          <form (ngSubmit)="saveOrganization()">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let org of organizations">
              <td>{{ org.organizationId }}</td>
              <td>{{ org.name }}</td>
              <td>{{ org.address }}</td>
              <td>{{ org.phone }}</td>
              <td>
                <button (click)="editOrganization(org)" class="btn">Edit</button>
                <button (click)="deleteOrganization(org.organizationId)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class OrganizationsComponent implements OnInit {
  organizations: any[] = [];
  showForm = false;
  editingOrg: any = null;
  formData = {
    name: '',
    address: '',
    phone: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.apiService.getOrganizations().subscribe(data => {
      this.organizations = data;
    });
  }

  editOrganization(org: any): void {
    this.editingOrg = org;
    this.formData = { ...org };
    this.showForm = true;
  }

  saveOrganization(): void {
    if (this.editingOrg) {
      this.apiService.updateOrganization(this.editingOrg.organizationId, this.formData)
        .subscribe(() => {
          this.loadOrganizations();
          this.cancelEdit();
        });
    } else {
      this.apiService.createOrganization(this.formData)
        .subscribe(() => {
          this.loadOrganizations();
          this.cancelEdit();
        });
    }
  }

  deleteOrganization(id: number): void {
    if (confirm('Are you sure you want to delete this organization?')) {
      this.apiService.deleteOrganization(id).subscribe(() => {
        this.loadOrganizations();
      });
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingOrg = null;
    this.formData = { name: '', address: '', phone: '' };
  }
}

