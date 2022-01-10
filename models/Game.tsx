import IPlayer from "../interfaces/IPlayers";
import IGame from "../interfaces/IGame";
import GAME_STATE from "../enums/GAME_STATE";
import IPicture from "../interfaces/IPicture";

export default class Game implements IGame{
   
    public players :IPlayer[] = [];
    public activePlayer : IPlayer | null  = null;
    public state : GAME_STATE  = GAME_STATE.NOT_INITIALIZED;  
    public cells: IPicture[][] = [];
    constructor(players : IPlayer[]){
        this.players = players;
    }
    attempt() : void {
        
    }
    start(): void {
        if(!this.players.length )
        throw new Error("must be a player in the game");
        
        this.activePlayer = this.players[0];
        this.activePlayer.isActive = true;
        this.attempt();

    }
    end(): void {
               
    } 

    getWinner(){

    }
}