import { Game } from './game';

fdescribe('Game', () => {
  it('should create an instance', () => {
    expect(new Game({} as any, {} as any, false)).toBeTruthy();
  });

  it('debe "changeSet" retornar false', () => {
    const game = new Game({} as any, {} as any, false);
    game.rate('team1');

    const actual = game.isChangeSet('team1');

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

    const actual = game.isChangeSet('team1');
    expect(actual).toBeTruthy();
  });

  it('debe "unrate" no hacer nada cuando es el primer set y van 0-0', () => {
    const game = new Game({} as any, {} as any, false);

    game.unrate('team1');

    expect(game.scores[0].team1).toEqual(0);
    expect(game.scores[0].team2).toEqual(0);

    game.unrate('team2');

    expect(game.scores[0].team1).toEqual(0);
    expect(game.scores[0].team2).toEqual(0);
  });

  it('debe "unrate" restar un punto del equipo que se le pase', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 2;
    game.scores[1] = {
      team1: 15,
      team2: 10,
      winner: null
    };

    game.unrate('team1');

    expect(game.scores[1].team1).toEqual(14);
    expect(game.scores[1].team2).toEqual(10);

    game.unrate('team2');

    expect(game.scores[1].team1).toEqual(14);
    expect(game.scores[1].team2).toEqual(9);
  });

  it('debe "unrate" restar un set y un punto en el set anterior cuando van 0-0 en un set y el juez se equivoca', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 2;
    game.scores[0] = {
      team1: 21, team2: 10, winner: 'team1'
    };
    game.scores[1] = {
      team1: 0, team2: 0, winner: null
    };

    game.unrate('team1');

    expect(game.set).toEqual(1);
    expect(game.scores[1].team1).toEqual(0);
    expect(game.scores[0].winner).toBeNull();
    expect(game.scores[0].team1).toEqual(20);
  });

  it('debe "unrate" no hacer nada si mando a "unrate" un equipo que esta en 0 pero no es el ganador del set anterior', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 2;
    game.scores[0] = {
      team1: 21, team2: 10, winner: 'team1'
    };
    game.scores[1] = {
      team1: 0, team2: 0, winner: null
    };

    game.unrate('team2');

    expect(game.set).toEqual(2);
    expect(game.scores[1].team1).toEqual(0);
    expect(game.scores[1].team2).toEqual(0);
    expect(game.scores[0].winner).toBe('team1');
    expect(game.scores[0].team1).toEqual(21);
  });

  it('debe "unrate" no hacer nada si mando a "unrate" un equipo que esta en 0 pero el otro equipo no lo está', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 2;
    game.scores[0] = {
      team1: 21, team2: 10, winner: 'team1'
    };
    game.scores[1] = {
      team1: 0, team2: 1, winner: null
    };

    game.unrate('team1');

    expect(game.set).toEqual(2);
    expect(game.scores[1].team1).toEqual(0);
    expect(game.scores[1].team2).toEqual(1);
    expect(game.scores[0].winner).toBe('team1');
    expect(game.scores[0].team1).toEqual(21);
  });

  it('debe "unrate" cuando el juego ya finalizó y envío el equipo que no ganó no hacer nada', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 3;
    game.scores[1] = {
      team1: 21, team2: 19, winner: 'team1'
    };
    game.scores[2] = {
      team1: 14, team2: 12, winner: null
    };

    game.rate('team1');
    game.unrate('team2');

    expect(game.winner).toEqual('team1');
    expect(game.set).toEqual(3);
    expect(game.ended).toBeTruthy();
    expect(game.scores[2].team1).toEqual(15);
    expect(game.scores[2].team2).toEqual(12);
  });

  it('debe "unrate" cuando el juego ya finalizó y envío el equipo ganador, abrir el juego y restar un punto', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 3;
    game.scores[1] = {
      team1: 21, team2: 19, winner: 'team1'
    };
    game.scores[2] = {
      team1: 14, team2: 12, winner: null
    };

    game.rate('team1');
    expect(game.scores[2].winner).toBe('team1');

    game.unrate('team1');

    expect(game.winner).toBe('');
    expect(game.set).toEqual(3);
    expect(game.ended).toBeFalsy();
    expect(game.scores[2].winner).toBeNull();
    expect(game.scores[2].team1).toEqual(14);
    expect(game.scores[2].team2).toEqual(12);
  });

  // tslint:disable-next-line: max-line-length
  it('debe "rate" no marcar ganador cuando van 20, 20 puntua el primer o el segundo equipo y el partido tiene alargue y es el set 1 o 2 ganador team2', () => {
    const game = new Game({} as any, {} as any, true);
    game.set = 1;
    game.scores[0] = {
      team1: 20,
      team2: 20,
      winner: null
    };

    game.rate('team1');
    expect(game.scores[0].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(22);

    game.rate('team2');
    expect(game.scores[0].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(23);

    game.rate('team2');
    game.rate('team2');

    expect(game.scores[0].winner).toBe('team2');
    expect(game.pointToFinishSet).toBe(21);
  });

  // tslint:disable-next-line: max-line-length
  it('debe "rate" no marcar ganador cuando van 20, 20 puntua el primer o el segundo equipo y el partido tiene alargue y es el set 1 o 2 ganador team1', () => {
    const game = new Game({} as any, {} as any, true);
    game.set = 1;
    game.scores[0] = {
      team1: 20,
      team2: 20,
      winner: null
    };

    game.rate('team1');
    expect(game.scores[0].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(22);

    game.rate('team2');
    expect(game.scores[0].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(23);

    debugger;
    game.rate('team1');
    game.rate('team1');

    expect(game.scores[0].winner).toBe('team1');
    expect(game.pointToFinishSet).toBe(21);
  });

  // tslint:disable-next-line: max-line-length
  it('debe "rate" marcar ganador cuando van 20, 20 puntua el primer y el partido no tiene alargue y es el set 1 o 2 ganador team1', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 1;
    game.scores[0] = {
      team1: 20,
      team2: 20,
      winner: null
    };

    game.rate('team1');
    expect(game.scores[0].winner).toBe('team1');
    expect(game.pointToFinishSet).toBe(21);
  });

  // tslint:disable-next-line: max-line-length
  it('debe "rate" marcar ganador cuando van 20, 20 puntua el primer y el partido no tiene alargue y es el set 1 o 2 ganador team2', () => {
    const game = new Game({} as any, {} as any, false);
    game.set = 1;
    game.scores[0] = {
      team1: 20,
      team2: 20,
      winner: null
    };

    game.rate('team2');
    expect(game.scores[0].winner).toBe('team2');
    expect(game.pointToFinishSet).toBe(21);
  });

  // tslint:disable-next-line: max-line-length
  it('debe "rate" no marcar ganador cuando van 14, 14 puntua el primer o el segundo equipo y el partido tiene alargue y es el tercer set', () => {
    const game = new Game({} as any, {} as any, true);
    game.set = 3;
    game.scores[0].winner = 'team1';
    game.scores[1].winner = 'team2';
    game.scores[2] = {
      team1: 14,
      team2: 14,
      winner: null
    };

    game.rate('team1');
    expect(game.scores[2].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(16);

    game.rate('team2');
    expect(game.scores[2].winner).toBeNull();
    expect(game.pointToFinishSet).toBe(17);

    game.rate('team2');
    game.rate('team2');

    expect(game.scores[2].winner).toBe('team2');
    expect(game.pointToFinishSet).toBe(17);
  });

  function firstWay() {
    const game = new Game({} as any, {} as any, false);
    game.set = 1;
    game.scores[0] = {
      team1: 21,
      team2: 10,
      winner: null
    };

    const actual = game.isChangeSet('team1');
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

    const actual = game.isChangeSet('team1');
    expect(actual).toBeTruthy();
  }
});

