import IPicture from "./IPicture";

export default interface IPictureService {
   getAllPictures() : { [key:string] : IPicture};
   getPicture(name : string | number) : IPicture;

   setPicture(picture : IPicture) : void;

   load(nPictures : number) : void;
   
}