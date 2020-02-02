import { Game } from './game';

fdescribe('Game', () => {
  it('should create an instance', () => {
    expect(new Game({} as any, {} as any, false)).toBeTruthy();
  });

  it('debe "changeSet" retornar false', () => {
    const game = new Game({} as any, {} as any, false);
    game.rate('team1');

    const actual = game.changeSet('team1');

    expect(actual).toBeFalsy();
  });

  it('debe "changeSet" retornar true cuando algun equipo alcanza 21 y es el set uno o dos', () => {
    firstWay();
    secondWay();
  });

  it('debe "changeSet" retornar true cuando algun equipo alcanza 15 y es el set tres', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 3;
    game.scores[2] = {
      team1: 15,
      team2: 10,
      winner: null
    };

    const actual = game.changeSet('team1');
    expect(actual).toBeTruthy();
  });

  function firstWay() {
    const game = new Game({} as any, {} as any, false);
    game.set = 1;
    game.scores[0] = {
      team1: 21,
      team2: 10,
      winner: null
    };

    const actual = game.changeSet('team1');
    expect(actual).toBeTruthy();
  }

  function secondWay() {
    const game = new Game({} as any, {} as any, false);
    game.set = 2;
    game.scores[1] = {
      team1: 21,
      team2: 10,
      winner: null
    };

    const actual = game.changeSet('team1');
    expect(actual).toBeTruthy();
  }
});

