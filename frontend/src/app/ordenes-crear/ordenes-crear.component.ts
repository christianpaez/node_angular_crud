import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, 
  FormGroup, NgForm, Validators } from '@angular/forms';
  import { ErrorStateMatcher } from '@angular/material/core';
    /** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ordenes-crear',
  templateUrl: './ordenes-crear.component.html',
  styleUrls: ['./ordenes-crear.component.scss']
})
export class OrdenesCrearComponent implements OnInit {

  isLoadingResults = false;
  ordenForm: FormGroup;
  canal = '';
  estado = '';
  valor: number = null; 
  descuento: number = null;
  tipo_de_entrega = '';
  tipo_de_envio = '';
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const numberReg = /^\d+$/;
    this.ordenForm = this.formBuilder.group({
      'canal' : [null, Validators.required],
      'estado' : [null, Validators.required],
      'valor' : [null, [Validators.required,Validators.pattern(numberReg)]],
      'descuento' : [null, [Validators.required, Validators.pattern(numberReg)]],
      'tipo_de_entrega' : [null, Validators.required],
      'tipo_de_envio' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log(this.ordenForm.value)
    this.api.addOrden(this.ordenForm.value)
      .subscribe((res: any) => {
        console.log(res)
/*           const id = res._id; */
          this.isLoadingResults = false;
/*           this.router.navigate(['/product-details', id]); */
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
