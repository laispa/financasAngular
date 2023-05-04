import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';

import { Injectable, Injector } from '@angular/core';

import { Observable } from "rxjs";
import { catchError, flatMap } from "rxjs/operators";

import { Entry } from "./entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService)
             { super("api/entries", injector, Entry.fromJson) } //só armazena a funcao, não executa

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))

  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this)) 
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry); //metodos iguais em base // this no flat map mudou tbm
      }),
      catchError(this.handleError) // usar para pegar em erro 
    );
  }

  // PRIVATE METHODS
  //posso só substituir o nome para o igual a Base - essa é a classe prioritária - sobrescrever
  // nao preciso mais disso deviso ao JsonResourcefn
  // protected jsonDataToResources(jsonData: any[]): Entry[] {
  //   const entries: Entry[] = [];

  //   jsonData.forEach(element => {
  //     const entry = Entry.fromJson(element);
  //     entries.push(entry);      
  //   });

  //   return entries;
  // }

  // protected jsonDataToResource(jsonData: any): Entry {
  //   return  Entry.fromJson(jsonData);
  // }

}
