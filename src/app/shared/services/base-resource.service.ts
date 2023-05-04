import { BaseResourceModel } from "../models/base-resource.model"
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from "@angular/core";

export abstract class BaseResourceService<T extends BaseResourceModel> {
//tipo extend base model

    protected http: HttpClient; //unica instancia

    constructor(
        protected apiPath: string, 
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T,
    ){
         this.http = injector.get(HttpClient)
         //repetir com outros possíveis objetos
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)), //inverti pq tava captando o erro primeiro
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            // map(this.jsonDataToResource), // this muda, vira mapsubscrive
            map(this.jsonDataToResource.bind(this)), // this vai ser o da classe a ser instanciada
            catchError(this.handleError)
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError),
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    //PROTECTED - para usar em outros services
    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(
            element => resources.push(this.jsonDataToResourceFn(element)));
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        // return jsonData as T;
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}