import IPicture from "../../interfaces/IPicture";
import { readdir } from 'fs/promises';
import * as path from 'path';
export default class PictureServerService {
    private pictures : any = null;
    private path = "public/images/pictures";
    constructor(){
        this.init();
    }

    init(){
        return this.getAllPictures();

    }
  
    async getAllPictures() : Promise<Array<IPicture>> {
        //return cache data
        if(this.pictures){
            return this.pictures;
        }
        else{
            return await this.getPicturesFromFolder();
        }
    }
   

    private async getPicturesFromFolder() : Promise<Array<IPicture>>{
       let files = await readdir(path.resolve(this.path));
       this.pictures =  files.map(item => {

          return { name : path.parse(item).name , src : "images/pictures/"+item , description : ""};
       });
       return this.pictures;
    }
    
}