import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: ` <ul class="layout-menu" #menuContainer>
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul>`
})
export class AppMenu {
    el: ElementRef = inject(ElementRef);

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    model: MenuItem[] = [
  // === DASHBOARD GROUP ===
  {
    label: 'Dashboard Analytics',
    icon: 'pi pi-fw pi-chart-bar',
    items: [
      {
        label: 'Analytics Overview',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/dashboards/xr-dashboard']
      },
      {
        label: 'Module Insights',
        icon: 'pi pi-fw pi-th-large',
        routerLink: ['/dashboards/module-insights']
      }
     
    ]
  },

  // === MASTERS GROUP ===
  {
    label: 'Admin Master',
    icon: 'pi pi-fw pi-database',
    items: [
      {
        label: 'Departments',
        icon: 'pi pi-fw pi-sitemap',
        routerLink: ['/departments/departmentstable']
      },
      {
        label: 'Designations',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/designations/designationstable']
      },
      {
            label: 'Modules',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/modules/modulecomponent']
          }
     
    ]
  },

  // === MANAGEMENT GROUP ===
  {
    label: 'User Management',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/user/usertable']
      },
      {
        label: 'Trainer',
        icon: 'pi pi-fw pi-user-edit',
        routerLink: ['/trainer/trainertable']
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-shield',
        routerLink: ['/admin/admintable']
      }
    ]
  },

  // === LEARNING & EVENTS GROUP ===
  {
    label: 'Training & Events',
    icon: 'pi pi-fw pi-calendar-plus',
    items: [
      {
        label: 'Content Hub',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/trainingmodule']
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/events/event-component']
      },
   
      {
        label: 'Certifications',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/certificates/certificatecomponent']
      }     
         
        ]  
  }  
      
    ]
  };

