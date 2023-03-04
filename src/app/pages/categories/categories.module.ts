import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Routes } from '@angular/router';


@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }

// site.com/categories =>list (master)
// site.com/categories/:id/edit => form (detail)
// site.com/categories/new => form (detail)