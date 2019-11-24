import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoresPage } from './game-scores.page';

describe('GameScoresPage', () => {
  let component: GameScoresPage;
  let fixture: ComponentFixture<GameScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
