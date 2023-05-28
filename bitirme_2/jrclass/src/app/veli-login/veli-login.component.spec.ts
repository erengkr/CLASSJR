import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeliLoginComponent } from './veli-login.component';

describe('VeliLoginComponent', () => {
  let component: VeliLoginComponent;
  let fixture: ComponentFixture<VeliLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeliLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeliLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
