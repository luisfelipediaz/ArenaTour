import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreRatePage } from './game-score-rate.page';

describe('GameScoreRatePage', () => {
  let component: GameScoreRatePage;
  let fixture: ComponentFixture<GameScoreRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
