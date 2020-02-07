export type Teams = 'team1' | 'team2';

export interface IGame {
    id: string;
    team1: Team;
    team2: Team;
    set: number;
    winner: Teams;
    ended: boolean;
    scores: Score[];
    lengthen: boolean;
}

export interface Score {
    team1: number;
    team2: number;
    winner: Teams;
}

export interface Team {
    id: string;
    club: string;
    duplaNumber: number;
    duplanumber: number;
    gender: 'F' | 'M';
}
