import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

//padronização para editar e criar
const routes: Routes =[
  {path: '', component: CategoryListComponent},
  {path: ':id/edit', component: CategoryFormComponent},
  {path: 'new', component: CategoryFormComponent},
]

// diferencia editar e criar em form. Quando vc entra no form ou edita ou cria
//orientações.. Ruei?

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
