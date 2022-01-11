import IPlayer from "../interfaces/IPlayers";
import IGame from "../interfaces/IGame";
import GAME_STATE from "../enums/GAME_STATE";
import IPicture from "../interfaces/IPicture";
import IPictureService from "../interfaces/IPictureService";
import GAME_DIFFICOULT from "../enums/GAME_DIFFICOULT";

export default class Game implements IGame {


    public activePlayer: IPlayer;
    public state: GAME_STATE = GAME_STATE.NOT_INITIALIZED;
    public cells: IPicture[][] = [];
    public tempScore : number = 0;
    private nRows = 9;
    private nColumns = 8;
    constructor(public players: IPlayer[] = [], private pictureService: IPictureService,private difficoult : GAME_DIFFICOULT = GAME_DIFFICOULT.HARD) {
        switch(this.difficoult){
            case GAME_DIFFICOULT.EASY:
                this.nRows = 4;
                this.nColumns = 2;
            break;
            case GAME_DIFFICOULT.MEDIUM:
            this.nRows = 5;
            this.nColumns = 4;    
            break;
            
        }

    }
    attempt(data: Array<{ x: number, y: number }>): any {

        if (this.state === GAME_STATE.STARTED) {
            if (!data || data.length !== 2)
                throw new Error("Every attempt need 2 cells");
            let firstChoice = this.cells[data[0].x][data[0].y];
            let secondChoice = this.cells[data[1].x][data[1].y];
            if (firstChoice.name === secondChoice.name){
                this.tempScore++;
                if(this.tempScore >= this.nRows*this.nColumns / 2){
                    this.activePlayer.totalScore = this.tempScore;
                    this.end();
                }
                return true;
            }
            else{
                if(this.tempScore > this.activePlayer.totalScore)
                    this.activePlayer.totalScore = this.tempScore;
                this.nextPlayer();
                return false;
            }
        }
    }

    async start(): Promise<void> {
        this.state = GAME_STATE.STARTED;
        if (!this.players.length)
            throw new Error("must be a player in the game");

        this.activePlayer = this.players[0];
        this.cells = await this.buildRandomCells(this.nRows, this.nColumns);
        this.tempScore = 0;
    }
    end(): void {
        this.tempScore = 0;
        this.state = GAME_STATE.ENDED;
    }

    async buildRandomCells(rows = this.nRows, columns = this.nColumns): Promise<IPicture[][]> {
        let cells: IPicture[][] = [];
        let picturesLeft = [];
        let nImages = rows * columns / 2
        if (rows * columns % 2 > 0) {
            throw new Error("The number of cells must be even");
        }
        await this.pictureService.load(nImages);
        //check : 0 - no added , check : 1 - added picture 1 
        picturesLeft = Array(nImages).fill(0).map((item, index) => { return { pos: index, check: 0 } });

        for (let r = 0; r < rows; r++) {
            cells[r] = [];
            for (let c = 0; c < columns; c++) {
                let random = this.getRandomInt(0, picturesLeft.length - 1);
                let item = picturesLeft[random];
                let posPicture = item.pos;
                let picture: IPicture = this.pictureService.getPicture(posPicture);
                cells[r][c] = picture;
                if (item.check === 0) {
                    item.check = 1;
                }
                else
                    picturesLeft.splice(random, 1);
            }
        }
        return cells;
    }

    getRandomInt(min: number, max: number): number {

        return Math.floor(Math.random() * (max - min)) + min;

    }

    nextPlayer(){
        this.tempScore = 0;
        if(this.players.length > 1 ){
            let currentPlayer  = this.players.indexOf(this.activePlayer);
            if(currentPlayer === this.players.length - 1){
                this.activePlayer = this.players[0];
            }
            else{
                this.activePlayer = this.players[currentPlayer + 1];
            }
        }
    }

   
}