import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { DataTablesModule } from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [BlogsComponent, CategoryComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [DatePipe]

})
export class BlogsModule { }
