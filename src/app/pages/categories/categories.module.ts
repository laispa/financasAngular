import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';


import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    
  ],
  declarations: [CategoryListComponent, CategoryFormComponent]
})
export class CategoriesModule { }

// site.com/categories =>list (master)
// site.com/categories/:id/edit => form (detail)
// site.com/categories/new => form (detail)