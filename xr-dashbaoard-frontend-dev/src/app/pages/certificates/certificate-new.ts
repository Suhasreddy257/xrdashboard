import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterService } from '@/layout/service/master.service';
import { UserService } from '@/layout/service/user.service';
import { CertificateService } from '@/layout/service/certificate.service';

@Component({
    selector: 'app-new-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        DatePickerModule,
        TextareaModule
    ],
    template: `
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <form class="grid grid-cols-1 sm:grid-cols-3 gap-6" (ngSubmit)="onSubmit()" #certificateForm="ngForm" novalidate>
          <div class="flex flex-col gap-1">
            <label for="userId" class="font-medium text-gray-800">
              User <span class="text-red-500">*</span>
            </label>
            <p-select
              id="userId"
              name="UserID"
              [options]="users"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.UserID"
              placeholder="Select User"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.UserID" class="text-red-500 text-xs">User is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="certificateId" class="font-medium text-gray-800">
              Certificate <span class="text-red-500">*</span>
            </label>
            <p-select
              id="certificateId"
              name="CertificateID"
              [options]="certificates"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.CertificateID"
              placeholder="Select Certificate"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.CertificateID" class="text-red-500 text-xs">Certificate is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="module" class="font-medium text-gray-800">Module ID<span class="text-red-500">*</span></label>
            <input 
              pInputText
              id="module"
              type="text"
              name="Module"
              [(ngModel)]="formData.Module"
              class="w-full"
              required
              placeholder="Enter Module Code"
            />
            <div *ngIf="formSubmitted && !formData.Module" class="text-red-500 text-xs">Module is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="issueDate" class="font-medium text-gray-800">Issue Date <span class="text-red-500">*</span></label>
            <p-datepicker
              id="issueDate"
              name="IssueDate"
              [(ngModel)]="formData.IssueDate"
              [showIcon]="true"
              [dateFormat]="'mm/dd/yy'"
              [class]="'w-full'"
              [style]="{'width':'100%'}"
              placeholder="Select Issue Date"
              required>
            </p-datepicker>
            <div *ngIf="formSubmitted && !formData.IssueDate" class="text-red-500 text-xs">Issue Date is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="verificationCode" class="font-medium text-gray-800">Verification Code <span class="text-red-500">*</span></label>
            <input 
              pInputText
              id="verificationCode"
              type="text"
              name="VerificationCode"
              [(ngModel)]="formData.VerificationCode"
              class="w-full"
              required
              placeholder="Enter Verification Code"
            />
            <div *ngIf="formSubmitted && !formData.VerificationCode" class="text-red-500 text-xs">Verification Code is required.</div>
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <label for="remarks" class="font-medium text-gray-800">Remarks</label>
            <textarea
              pInputTextarea
              id="remarks"
              name="Remarks"
              [(ngModel)]="formData.Remarks"
              class="w-full"
              rows="3"
              placeholder="Enter any remarks (optional)">
            </textarea>
          </div>
        <div class="flex items-center gap-6 mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="certificateMode" 
              [(ngModel)]="mode" 
              [value]="'generate'" 
              class="accent-blue-600"
            />
            <span>Generate</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="certificateMode" 
              [(ngModel)]="mode" 
              [value]="'upload'" 
              class="accent-blue-600"
            />
            <span>Upload</span>
            <input 
              *ngIf="mode === 'upload'"
              type="file"
              name="certificateFile"
              (change)="onFileSelected($event)"
              class="ml-3"
              style="display: inline-block;"
            />
          </label>
        </div>
        </form>
        <div class="flex justify-end gap-3 mt-8">
        <button pButton type="button" label="Cancel" icon="pi pi-times"  class="p-button-danger p-button-danger" (click)="cancel()"></button>
        <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" form="ngForm" (click)="onSubmit()"></button>
        </div>
      </div>`
})
export class NewCertificate implements OnInit {
    formSubmitted: boolean = false;
    formData: any = {
        UserID: null,
        CertificateID: null,
        Module: '',
        IssueDate: null,
        VerificationCode: '',
        Remarks: ''
    };
    users: any[] = [];
    certificates: any[] = [];

    // --- additional properties for mode and upload/generation ---
    mode: 'generate' | 'upload' = 'generate';
    genCertificateName: string = '';
    uploadedFile: File | null = null;
    uploadedFileName: string = '';

    constructor(
        private userService: UserService,
        private masterService: MasterService,
        private messageService: MessageService,
        private certificateService: CertificateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userService.getAllUser().subscribe({
            next: (res) => {
                if (res && Array.isArray(res.ml_User)) {
                    this.users = res.ml_User.map((user: any) => ({
                        id: user.userID,
                        name: user.firstName + ' ' + user.lastName
                    }));
                } else {
                    this.users = [];
                }
            },
            error: () => {
                this.users = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch users'});
            }
        });

        this.masterService.getMasCertificate().subscribe({
            next: (res) => {
                if (res && Array.isArray(res.ml_Certificate)) {
                    this.certificates = res.ml_Certificate.map((cert: any) => ({
                        id: cert.id,
                        name: cert.name,
                        certificateType: cert.certificateType,
                        moduleID: cert.moduleID,
                        templateFilePath: cert.templateFilePath,
                        digitalSignatureURL: cert.digitalSignatureURL,
                        includeQRCode: cert.includeQRCode,
                        verificationURL: cert.verificationURL,
                        isActive: cert.isActive
                    }));
                } else {
                    this.certificates = [];
                }
            },
            error: () => {
                this.certificates = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch certificates'});
            }
        });
    }

    setMode(mode: 'generate' | 'upload') {
        this.mode = mode;
    }

    cancel() {
        this.router.navigate(['/certificates/certificatecomponent']);
    }

    onSubmit() {
        this.formSubmitted = true;
        if (
          !this.formData.UserID ||
          !this.formData.CertificateID ||
          !this.formData.Module ||
          !this.formData.IssueDate ||
          !this.formData.VerificationCode
        ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields'});
            return;
        }

        const nowIso = new Date().toISOString();
        let formattedIssueDate: string | null = null;
        if (this.formData.IssueDate instanceof Date) {
            const d = this.formData.IssueDate;
            formattedIssueDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
        } else if (typeof this.formData.IssueDate === 'string') {
            const d = new Date(this.formData.IssueDate);
            if (!isNaN(d.getTime())) {
                formattedIssueDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
            } else {
                formattedIssueDate = null;
            }
        } else {
            formattedIssueDate = null;
        }

        if (!formattedIssueDate) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Invalid Issue Date'});
            return;
        }

        const certificatePayload = {
            id: 0,
            certificateID: this.formData.CertificateID,
            userID: this.formData.UserID,
            moduleID: this.formData.Module,
            issueDate: formattedIssueDate, 
            certificateURL: '',
            qrCodeURL: '',
            verificationCode: this.formData.VerificationCode,
            isRevoked: false,
            remarks: this.formData.Remarks || '',
            createdUserID: 0,
            createdDateTime: nowIso,
            updatedUserID: 0,
            updatedDateTime: nowIso,
            isActive: true
        };

        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_certificate: certificatePayload
        };

        this.certificateService.put_NewCertificate(payload.m_certificate).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Certificate entry created successfully'});
                this.router.navigate(['/certificates/certificatecomponent']);
            },
            error: () => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create certificate'});
            }
        });
    }

    onGenerateCertificate() {
        if (!this.genCertificateName || !this.formData.UserID || !this.formData.CertificateID) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please provide certificate name, user and certificate'});
            return;
        }
        this.messageService.add({severity: 'success', summary: 'Generate', detail: `Certificate "${this.genCertificateName}" generated.`});
    }

    onFileSelected(event: any) {
        const file: File | null = event.target && event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
        if (file) {
            this.uploadedFile = file;
            this.uploadedFileName = file.name;
        } else {
            this.uploadedFile = null;
            this.uploadedFileName = '';
        }
    }

    onUploadCertificate() {
        if (!this.uploadedFile) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please select a file to upload.'});
            return;
        }
        this.messageService.add({severity: 'success', summary: 'Upload', detail: `File "${this.uploadedFileName}" uploaded.`});
        this.uploadedFile = null;
        this.uploadedFileName = '';
    }
}