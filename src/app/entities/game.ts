import { Team, Score, IGame, Teams } from '../app.model';

export class Game implements IGame {
    id: string = null;
    set: number;
    winner: Teams = null;
    scores: Score[];
    ended = false;

    get currentSet(): Score {
        return this.scores[this.set - 1];
    }

    constructor(public team1: Team, public team2: Team, public lengthen: boolean) {
        this.set = 1;
        this.scores = [
            { team1: 0, team2: 0, winner: null },
            { team1: 0, team2: 0, winner: null },
            { team1: 0, team2: 0, winner: null }
        ];
    }

    rate(team: Teams) {
        if (this.ended) { return; }
        this.currentSet[team]++;
        this.proccessIfChangeSet(team);
    }

    unrate(team: Teams) {
        if (this.isBeginningGame()) { return; }
        if (this.currentTeamAtZeroButOtherNo(team)) { return; }
        if (this.currentTeamNotAreTheWinnerOfPreviousSet(team)) { return; }
        if (this.gameEndedAndCurrentTeamNotAreWinner(team)) { return; }

        this.verifyBeginingSet();
        this.proccessUnrate(team);
    }

    private proccessUnrate(team: string) {
        this.winner = null;
        this.currentSet.winner = null;
        this.ended = false;
        this.currentSet[team]--;
    }

    private gameEndedAndCurrentTeamNotAreWinner(team: string): boolean {
        return this.ended && this.currentSet.winner !== team;
    }

    private isBeginningGame(): boolean {
        return this.set === 1 && this.areAllTeamsAtZero();
    }

    private currentTeamAtZeroButOtherNo(team: Teams): boolean {
        return this.currentSet[team] === 0 && this.currentSet[this.getOtherTeam(team)] !== 0;
    }

    private currentTeamNotAreTheWinnerOfPreviousSet(team: Teams): boolean {
        return this.areAllTeamsAtZero() && this.set > 1 && this.scores[this.set - 2].winner !== team;
    }

    private verifyBeginingSet() {
        if (this.areAllTeamsAtZero()) {
            this.set--;
        }
    }

    private areAllTeamsAtZero(): boolean {
        return this.currentSet.team1 === 0 && this.currentSet.team2 === 0;
    }

    private getOtherTeam(team: Teams): Teams {
        return team === 'team1' ? 'team2' : 'team1';
    }

    private proccessIfChangeSet(team: Teams) {
        if (this.changeSet(team)) {
            this.changeSetTeam(team);
        }
    }

    private changeSetTeam(team: Teams) {
        this.currentSet.winner = team;
        this.verifyEnded(team);
    }

    private verifyEnded(team: Teams) {
        if (this.scores.filter(a => a.winner === team).length === 2) {
            this.ended = true;
            this.winner = team;
        } else {
            this.set++;
        }
    }

    changeSet(team: string): boolean {
        return this.firstAndSecondSet(team) || this.threeSet(team);
    }

    private firstAndSecondSet(team: string) {
        return this.set <= 2 && this.currentSet[team] === 21;
    }

    private threeSet(team: string) {
        return this.set === 3 && this.currentSet[team] === 15;
    }

    toJSON(): IGame {
        return {
            ended: this.ended,
            id: this.id,
            scores: this.scores,
            set: this.set,
            team1: this.team1,
            team2: this.team2,
            winner: this.winner,
            lengthen: this.lengthen
        };
    }
}
