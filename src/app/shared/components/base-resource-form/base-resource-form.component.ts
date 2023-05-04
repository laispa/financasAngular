
import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from "rxjs/operators";

import toastr from "toastr";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    //   category: Category = new Category(); 
    // fazer de outro jeito -- public resource: T, // podera ser category ou entry


    // usando injector
    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T, // podera ser category ou entry // new category this.resource - this.category
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
     }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;

        if (this.currentAction == "new")
            this.createResource();
        else // currentAction == "edit"
            this.updateResource();
    }


    // PRIVATE METHODS

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new"
        else
            this.currentAction = "edit"
    }

    // protected buildResourceForm() {
    //     this.categoryForm = this.formBuilder.group({
    //         id: [null],
    //         name: [null, [Validators.required, Validators.minLength(2)]],
    //         description: [null]
    //     });
    // }

    protected loadResource() {
        if (this.currentAction == "edit") {

            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id"))) //como uma interface
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource) // binds loaded category data to CategoryForm
                    },
                    (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
                )
        }
    }


    protected setPageTitle() {
        if (this.currentAction == 'new')
            this.pageTitle = this.creationPageTitle();
        else {
            this.pageTitle=this.editionPageTitle()
            // const categoryName = this.category.name || ""
            // this.pageTitle = "Editando Categoria: " + categoryName;
        }
    }

    creationPageTitle(): string{
        return "Novo" // para sobreescrever dps 
    }

    protected editionPageTitle(): string{
        return "Edição" // para sobreescrever dps 
    }

    // apesar de create e update ser parecido é bom deixar separado para caso de sobreescrever 
    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }


    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

        this.resourceService.update(resource)
            .subscribe(
                category => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }


    protected actionsForSuccess(resource: T) {
        toastr.success("Solicitação processada com sucesso!");
        const baseComponentPath: string = this.route.snapshot.parent.url[0].path; // para pegar o nome categories e assim tornar generico
        // redirect/reload component page
        this.router.navigateByUrl("baseComponentPath", { skipLocationChange: true }).then(
            () => this.router.navigate(["baseComponentPath", resource.id, "edit"])
        )
    }


    protected actionsForError(error) {
        toastr.error("Ocorreu um erro ao processar a sua solicitação!");

        this.submittingForm = false;

        if (error.status === 422)
            this.serverErrorMessages = JSON.parse(error._body).errors;
        else
            this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, teste mais tarde."]
    }

    protected abstract buildResourceForm(): void;
}
