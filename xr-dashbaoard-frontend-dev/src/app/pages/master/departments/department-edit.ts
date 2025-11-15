import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MasterService } from '@/layout/service/master.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-edit-department',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        InputTextModule, ButtonModule
    ],
    template: `
        <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <div class="font-bold text-2xl mb-6 text-gray-900">Edit Department</div>
            <form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" (ngSubmit)="onSubmit()" #deptForm="ngForm" novalidate>
                <div class="flex flex-col gap-1">
                    <label for="departmentName" class="font-medium text-gray-800">Department Name <span class="text-red-500">*</span></label>
                    <input pInputText id="departmentName" type="text" name="DepartmentName" [(ngModel)]="formData.name" class="w-full" required placeholder="Enter Department Name" />
                    <div *ngIf="formSubmitted && !formData.name" class="text-red-500 text-xs">Department Name is required.</div>
                </div>
                <div class="flex flex-col gap-1 col-span-2">
                    <label for="departmentDescription" class="font-medium text-gray-800">Description </label>
                    <input pInputText id="departmentDescription" type="text" name="DepartmentDescription" [(ngModel)]="formData.description" class="w-full" style="min-width: 400px;" placeholder="Enter Description(Optional)"/>                    
                </div>
            </form>
            <div class="flex justify-end gap-3 mt-8">
                <button pButton type="button" label="Cancel" icon="pi pi-times" class="p-button-danger" (click)="cancel()"></button>
                <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" form="deptForm" (click)="onSubmit()"></button>
            </div>
        </div>
    `
})
export class EditDepartment implements OnInit {
    router: Router;

    formSubmitted: boolean = false;
    departmentId: number | string = 0;

    constructor(
        private masterService: MasterService,
        private messageService: MessageService,
    ) {
        this.router = inject(Router);
    }

    formData: any = {
        name: '',
        description: '',
        createdUserID: '',
        createdDateTime:'',
        updatedUserID:''
    };

    ngOnInit() {
        const navigation = this.router.getCurrentNavigation();
        const state = (navigation?.extras?.state as any) || {};
        const passedDept = state.department || (history?.state ? (history.state as any).department : undefined);

        if (passedDept) {
            this.departmentId = passedDept.id ?? passedDept.departmentId ?? 0;
            this.formData = {
                name: passedDept.departmentName ?? passedDept.name ?? '',
                description: passedDept.description ?? '',
                createdUserID: passedDept.createdUserID ,
                createdDateTime: passedDept.createdDateTime,
                updatedUserID: passedDept.updatedUserID,
            };
        }
    }

    onSubmit() {
        this.formSubmitted = true;

        if (
            !this.formData.name ||
            this.formData.name.trim() === ''
        ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Department name is required.'
            });
            return;
        }

        const userID = 999;
        const currentDate = new Date().toISOString();

        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_OrganizationDepartment: {
                id: this.departmentId,
                name: this.formData.name.trim(),
                description: this.formData.description ? this.formData.description.trim() : '',
                createdUserID: userID,
                createdDateTime: this.formData.createdDateTime,
                updatedUserID: userID,
                updatedDateTime: currentDate,
                isActive: true
            }
        };

        this.masterService.putOrganizationDepartmentEdit(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Department successfully created.'
                });
                this.router.navigate(['/departments/departmentstable']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create department.'
                });
            }
        });
    }
    cancel() {
        this.router.navigate(['/departments/departmentstable']);
    }
}