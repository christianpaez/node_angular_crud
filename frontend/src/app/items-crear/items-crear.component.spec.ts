import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCrearComponent } from './items-crear.component';

describe('ItemsCrearComponent', () => {
  let component: ItemsCrearComponent;
  let fixture: ComponentFixture<ItemsCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
