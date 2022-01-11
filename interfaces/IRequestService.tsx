
export default interface IRequestService {

   send(data : any,uri : string , options : any) : Promise<any>;
   send(data : any,uri : string ) : Promise<any>;

}