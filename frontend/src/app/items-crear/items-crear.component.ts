import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-items-crear',
  templateUrl: './items-crear.component.html',
  styleUrls: ['./items-crear.component.scss']
})
export class ItemsCrearComponent implements OnInit {

  isLoadingResults = false;
  _id: string = '';
  itemForm: FormGroup;
  sku = '';
  nombre = '';
  cantidad: number = null; 
  precio: number = null;
  codigo_de_barra: number = null;
  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id']
    const numberReg = /^\d+$/;
    this.itemForm = this.formBuilder.group({
      'sku' : [null, Validators.required],
      'nombre' : [null, Validators.required],
      'cantidad' : [null, [Validators.required,Validators.pattern(numberReg)]],
      'precio' : [null, [Validators.required, Validators.pattern(numberReg)]],
      'codigo_de_barra' : [null, [Validators.required, Validators.pattern(numberReg)]],
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addItem(this.itemForm.value, this._id)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/ordenes-detalle', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
