import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListViewComponent } from './products-list-view.component';

describe('ProductsListViewComponent', () => {
  let component: ProductsListViewComponent;
  let fixture: ComponentFixture<ProductsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
