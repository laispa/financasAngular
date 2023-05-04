import { SharedModule } from './../../shared/shared.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from "./entry-list/entry-list.component";
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  imports: [
    SharedModule,
    EntriesRoutingModule,
    IMaskModule,
    CalendarModule,
  ],
  declarations: [EntryListComponent, EntryFormComponent]
})
export class EntriesModule { }