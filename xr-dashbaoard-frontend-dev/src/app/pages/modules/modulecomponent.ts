import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModuleService } from './moduleservice';
import { AppModule } from './modulemodel';

@Component({
  selector: 'app-modules',
  styleUrls: ['./modulecomponent.scss'],
  standalone: true,
  imports: [CommonModule], // ✅ Required for ngIf, ngFor, ngStyle
  template: `
    <div class="module-container">
      <h2 class="page-title">Modules</h2>

      <div class="module-grid">
        <div
          class="module-card"
          *ngFor="let module of modules"
          (click)="navigateTo(module.route)"
        >
          <div
            class="icon-wrapper"
            [ngStyle]="{ background: module.color || '#007ad9' }"
          >
            <i class="{{ module.icon }}"></i>
          </div>

          <div class="module-info">
            <h3>{{ module.title }}</h3>
            <p>{{ module.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
 
})
export class ModuleComponent implements OnInit {
  modules: AppModule[] = [];
  userRole: string = 'Admin';

  constructor(private moduleService: ModuleService, private router: Router) {}

  ngOnInit(): void {
    this.modules = this.moduleService.getModulesForRole(this.userRole);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
