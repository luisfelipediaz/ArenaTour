import { Team, Score, IGame } from '../app.model';

export class Game implements IGame {

    id: string;
    set: number;
    winner: 'team1' | 'team2';
    scores: Score[];
    ended = false;

    private get currentSet(): Score {
        return this.scores[this.set - 1];
    }

    constructor(
        public team1: Team,
        public team2: Team,
        public alargue: boolean
    ) {
        this.set = 1;
        this.scores = [
            { team1: 0, team2: 0, winner: null },
            { team1: 0, team2: 0, winner: null },
            { team1: 0, team2: 0, winner: null }
        ];
    }

    rate(team: 'team1' | 'team2') {
        if (this.ended) { return; }

        this.currentSet[team]++;

        if (this.changeSet(team)) {
            this.changeSetTeam(team);
        }
    }

    private changeSetTeam(team: 'team1' | 'team2') {
        this.currentSet.winner = team;
        this.verifyEnded(team);
    }

    private verifyEnded(team: 'team1' | 'team2') {
        if (this.scores.filter(a => a.winner === team).length === 2) {
            this.ended = true;
            this.winner = team;
        } else {
            this.set++;
        }
    }

    changeSet(team: string) {
        return this.firstAndSecondSet(team) || this.threeSet(team);
    }

    toJSON(): IGame {
        return {
            ended: this.ended,
            id: this.id,
            scores: this.scores,
            set: this.set,
            team1: this.team1,
            team2: this.team2,
            winner: this.winner
        };
    }

    private firstAndSecondSet(team: string) {
        return this.set <= 2 && this.currentSet[team] === 21;
    }

    private threeSet(team: string) {
        return this.set === 3 && this.currentSet[team] === 15;
    }
}
