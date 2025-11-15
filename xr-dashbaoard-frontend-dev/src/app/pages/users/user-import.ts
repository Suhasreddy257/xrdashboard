import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UploaderComponent } from '@/apps/files/uploader/uploader';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-import-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        UploaderComponent
    ],
    template: `
        <div class="employee-form-container">
            <div class="text-xl font-semibold mb-3 text-center text-white bg-primary py-2 rounded-md">
                Upload User Data
            </div>

            <div class="text-xl font-semibold mb-4">
                <a href="/templates/Employee_Import_Template.xlsx"
                   download
                   pButton icon="pi pi-download"
                   label="Download Excel Template (Sample File)"
                   class="p-button-success w-full">
                </a>
            </div>

            <div class="card !p-0 mb-4">
                <app-file-uploader (fileSelected)="onFileSelected($event)"></app-file-uploader>
            </div>

            <div class="mt-4 flex gap-2">
                <button pButton class="flex-1 p-button-danger" icon="pi pi-times" label="Cancel" (click)="cancel()"></button>
                <button pButton class="flex-1 p-button-primary" icon="pi pi-upload" label="Upload" (click)="uploadFile()" [disabled]="!selectedFile || isUploading"></button>
            </div>

            <p *ngIf="uploadProgress > 0" class="mt-2 text-center">Progress: {{ uploadProgress }}%</p>
        </div>
    `,
    styles: [`
        .employee-form-container {
            max-width: 800px;
            margin: 1rem auto;
            background: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            padding: 1.5rem;
        }
    `]
})
export class ImportUser {
    private http = inject(HttpClient);
    private router = inject(Router);

    selectedFile: File | null = null;
    uploadProgress = 0;
    isUploading = false;

    onFileSelected(file: File | null) {
        this.selectedFile = file;
    }

    uploadFile() {
        if (!this.selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.isUploading = true;

        this.http.post(environment.apiUrl+'/File/Upload', formData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe({
            next: (event) => {
                if (event.type === HttpEventType.UploadProgress && event.total) {
                    this.uploadProgress = Math.round((event.loaded / event.total) * 100);
                } else if (event.type === HttpEventType.Response) {
                    this.isUploading = false;
                    alert('Users imported successfully!');
                    this.router.navigate(['/user/usertable']);
                }
            },
            error: (err) => {
                this.isUploading = false;
                alert('Upload failed. Please try again.');
                console.error('Upload error:', err);
            }
        });
    }

    cancel() {
        this.router.navigate(['/user/usertable']);
    }
}
