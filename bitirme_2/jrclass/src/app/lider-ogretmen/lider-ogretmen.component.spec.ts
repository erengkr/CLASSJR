import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderOgretmenComponent } from './lider-ogretmen.component';

describe('LiderOgretmenComponent', () => {
  let component: LiderOgretmenComponent;
  let fixture: ComponentFixture<LiderOgretmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiderOgretmenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderOgretmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
