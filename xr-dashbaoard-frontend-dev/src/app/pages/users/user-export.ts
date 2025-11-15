import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputOtpModule } from 'primeng/inputotp';
import { Router } from '@angular/router';
import { UploaderComponent } from '@/apps/files/uploader/uploader';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-import-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule,
        IftaLabelModule,
        InputOtpModule,
        DialogModule
    ],
    template: `
        <div class="employee-form-container">
            <div class="employee-form-container">
                <!-- Header with Export Button -->
                <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-3">
                    <p-button label="Export" styleClass="p-button-primary header-btn w-full"></p-button>
                </div>

           
                <!-- Export Info -->
                <div class="card !p-0 p-3 text-center">
                    <p>Exporting the <span class="highlight">Selected /</span> All Employee/Trainer/Admin to Excel</p>
                </div>

                <!-- Action Buttons -->
                <div class="mt-4 flex gap-2">
                    <button pButton pRipple class="flex-1 p-button-danger" label="Cancel" (click)="onCancel()"></button>
                    <button pButton pRipple class="flex-1 p-button-primary" label="Export" (click)="onExport()"></button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .employee-form-container {
                max-width: 1200px;
                margin: 0.5rem auto;
                background: #ffffff;
                border-radius: 1rem;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                padding: 1.5rem;
            }
            .employee-form-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                color: #2d3748;
                letter-spacing: 0.01em;
            }
            .employee-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                gap: 2rem 2.5rem;
            }
            @media (max-width: 900px) {
                .employee-form-grid {
                    grid-template-columns: 1fr;
                }
            }
            .employee-form-group {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            .employee-form-label {
                font-weight: 500;
                color: #374151;
                margin-bottom: 0.2rem;
            }
            .employee-form-input,
            .employee-form-select,
            .employee-form-autocomplete {
                width: 100%;
                min-width: 0;
            }
            .employee-form-actions {
                grid-column: 1 / -1;
                display: flex;
                justify-content: flex-end;
                margin-top: 1rem;
            }
        `
    ]
})
export class ExportUser {
    //router: Router;

    displayExportDialog = false;

    onCancel() {
        this.displayExportDialog = false;
    }

    onExport() {
        console.log('Exporting data...');
        this.displayExportDialog = false;
    }
}
