import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
