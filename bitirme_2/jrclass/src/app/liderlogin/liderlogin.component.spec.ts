import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderloginComponent } from './liderlogin.component';

describe('LiderloginComponent', () => {
  let component: LiderloginComponent;
  let fixture: ComponentFixture<LiderloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiderloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
