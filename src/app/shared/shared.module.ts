import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    FloatLabelModule,
    DatePickerModule,
    FieldsetModule,
    SelectModule,
    TooltipModule
  ]
})
export class SharedModule { }
