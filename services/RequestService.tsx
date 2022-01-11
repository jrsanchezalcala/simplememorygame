import IRequestService from "../interfaces/IRequestService";

export default class RequestService implements IRequestService{
    private host : string = "/api/";
    send(data : any,uri : string) : any {
        return fetch(this.host+uri, {
            method: 'post',
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });
        
    }

}