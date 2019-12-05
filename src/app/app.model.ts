export interface Game {
    team1: Team;
    team2: Team;
    set: number;
    winner: Team;
    finish: boolean;
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
}
