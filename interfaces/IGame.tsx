import IPlayer from "./IPlayers";

export default interface IGame {
   players : IPlayer[] ;
   activePlayer : IPlayer | null;
   start():void;
   end():void;
   attempt() : void ;
   
}