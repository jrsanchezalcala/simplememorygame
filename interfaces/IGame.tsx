import IPlayer from "./IPlayers";

export default interface IGame {
   players : IPlayer[] ;
   activePlayer ?: IPlayer;
   start():void;
   end():void;
   attempt(data : any | null) : any ;
   
}