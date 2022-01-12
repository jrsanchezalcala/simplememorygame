import IPlayer from "../interfaces/IPlayers";
import IGame from "../interfaces/IGame";
import GAME_STATE from "../enums/GAME_STATE";
import IPicture from "../interfaces/IPicture";
import IPictureService from "../interfaces/IPictureService";
import GAME_DIFFICOULT from "../enums/GAME_DIFFICOULT";

export default class GamePicture implements IPicture {
    name: string;
    src: string;
    description: string;
    selected : boolean;
}