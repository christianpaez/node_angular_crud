import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEditarComponent } from './ordenes-editar.component';

describe('OrdenesEditarComponent', () => {
  let component: OrdenesEditarComponent;
  let fixture: ComponentFixture<OrdenesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
