import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
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
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { EmployeeService } from '@/layout/service/employee.service';
import { MessageService } from 'primeng/api';
import { MasterService } from '@/layout/service/master.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    InputTextModule, ButtonModule, CheckboxModule, RadioButtonModule, SelectButtonModule,
    InputGroupModule, FluidModule, IconFieldModule, InputIconModule, FloatLabelModule,
    AutoCompleteModule, InputNumberModule, SliderModule, RatingModule, ColorPickerModule,
    KnobModule, SelectModule, DatePickerModule, ToggleButtonModule, ToggleSwitchModule,
    TreeSelectModule, MultiSelectModule, ListboxModule, InputGroupAddonModule, TextareaModule,
    IftaLabelModule, InputOtpModule
  ],
  template: `
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
        View
       
      </div>
      <!-- <iframe src="https://webglsamples.org/aquarium/aquarium.html" height="200" width="5000" title="Iframe Example"></iframe> -->
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <iframe src="https://webglsamples.org/aquarium/aquarium.html" height="500" width="1200" title="Iframe Example"></iframe>
      </div>
    <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <iframe src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" height="500" width="1200" title="Iframe Example"></iframe>
    </div>
    <iframe 
  src="https://docs.google.com/gview?url=https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf&embedded=true" 
  width="900" 
  height="500">
</iframe>
      
    `
})
export class View implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private masterService: MasterService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.router = inject(Router);
  }

  ngOnInit() {
    
  }

}