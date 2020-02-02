export interface IGame {
    id: string;
    team1: Team;
    team2: Team;
    set: number;
    winner: 'team1' | 'team2';
    ended: boolean;
    scores: Score[];
}

export interface Score {
    team1: number;
    team2: number;
    winner: 'team1' | 'team2';
}

export interface Team {
    id: string;
    name: string;
    doubleNumber: number;
}
