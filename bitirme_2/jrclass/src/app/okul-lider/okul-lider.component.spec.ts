import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkulLiderComponent } from './okul-lider.component';

describe('OkulLiderComponent', () => {
  let component: OkulLiderComponent;
  let fixture: ComponentFixture<OkulLiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OkulLiderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OkulLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
