import IPicture from "../interfaces/IPicture";
import IPictureService from "../interfaces/IPictureService";
import IRequestService from "../interfaces/IRequestService";

export default class PictureService implements IPictureService{
    public pictures : any = {};
    private uri = "pictures";
    constructor(private requestService : IRequestService){
        
    }
    async load(nPictures: number): Promise<void> {
        if(nPictures < 1 ){
            throw new Error("the number of pictures to load must be an integer more than 1");
        }
        this.pictures = await this.requestService.send({ nPictures } , "pictures");
        
    }

    getAllPictures(){
        return this.pictures;
    }

    getPicture(name: string | number): IPicture {
        if(typeof name === "number"){
            this.getPictureByPosition(name);
        }
      return this.pictures[name]; 
    }
    
    getPictureByPosition(pos : number){
        return Object.values(this.pictures)[pos];
    }

    setPicture(picture: IPicture): void {
        try{
            this.validatePicture(picture);
            this.pictures[picture.name] = picture;
        }
        catch(error){
            throw error;
        }
  
    }

    validatePicture(picture : IPicture){
        if(!picture.name)
        throw new Error("Picture do not have name");
        if(!picture.src)
        throw new Error("Picture do not have src");
    }
    
}