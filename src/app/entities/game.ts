import { Team, Score, GameData, Teams } from '../app.model';

const topSets = {
    1: 20,
    2: 20,
    3: 14
};

export class Game implements GameData {
    id: string = null;
    set: number;
    winner: Teams = null;
    scores: Score[];
    ended = false;
    active = true;

    get topSet(): number {
        return topSets[this.set];
    }

    get pointToFinishSet(): number {
        if (this.currentSet.team1 < this.topSet || this.currentSet.team2 < this.topSet) { return this.topSet + 1; }

        if (this.currentSet.team1 - this.currentSet.team2 < 2) {
            return Math.min(this.currentSet.team1, this.currentSet.team2) + 2;
        }
    }

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
        if (this.isChangeSet(team)) {
            this.changeSetTeam(team);
        }
    }

    private changeSetTeam(team: Teams) {
        this.currentSet.winner = team;
        this.verifyEnded(team);
    }

    private verifyEnded(team: Teams) {
        if (this.howManySetsTeamWon(team) === 2) {
            this.ended = true;
            this.winner = team;
        } else {
            this.set++;
        }
    }

    private howManySetsTeamWon(team: Teams): number {
        return this.scores.filter(a => a.winner === team).length;
    }

    isChangeSet(team: string): boolean {
        return this.currentSet[team] === this.pointToFinishSet;
    }

    inactive() {
        this.active = false;
    }

    toJSON(): GameData {
        return {
            ended: this.ended,
            id: this.id,
            scores: this.scores,
            set: this.set,
            team1: this.team1,
            team2: this.team2,
            winner: this.winner,
            lengthen: this.lengthen,
            active: this.active
        };
    }
}
