import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder,
   FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Orden } from '../ordenes';

   /** Error when invalid control is dirty, touched, or submitted. */
   export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
  selector: 'app-ordenes-editar',
  templateUrl: './ordenes-editar.component.html',
  styleUrls: ['./ordenes-editar.component.scss']
})
export class OrdenesEditarComponent implements OnInit {

ordenForm: FormGroup;
_id = '';
valor: number = null;
estado: string = '';
isLoadingResults = false;

  //error matcher

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router, 
    private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const numberReg = /^\d+$/;
    this._id = this.route.snapshot.params['id']
    this.getOrden(this._id)
    this.ordenForm = this.formBuilder.group({
      'valor' : [null, [Validators.required, Validators.pattern(numberReg)]],
      'estado' : [null, Validators.required],
    })
  }

  getOrden(id: any){
    this.api.getOrden(id)
    .subscribe((data: any)=>{
      data._id = this._id;
      this.ordenForm.setValue({
        valor : data.valor,
        estado : data.estado,
      })
    })
  }

  onFormSubmit(){
    this.isLoadingResults = true;
    this.api.updateOrden(this._id, this.ordenForm.value)
    .subscribe((res: any)=>{
      const id = res._id;
      this.isLoadingResults = false;
      this.router.navigate(['/ordenes-detalle', id])
    }, (err) => {
      console.log(err)
      this.isLoadingResults = false;
    })
  }

  ordenDetails(){
    this.router.navigate(['/ordenes-detalle', this._id])
  }
}
