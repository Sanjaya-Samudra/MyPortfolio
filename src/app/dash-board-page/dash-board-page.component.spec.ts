import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPageComponent } from './dash-board-page.component';

describe('DashBoardPageComponent', () => {
  let component: DashBoardPageComponent;
  let fixture: ComponentFixture<DashBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
