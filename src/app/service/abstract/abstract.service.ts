import { environment } from "../../../environments/environment";

export abstract class AbstractService {
    url: string = environment.production ? 'https://estagio4me-server.herokuapp.com' : 'http://localhost:3000'

    constructor(url: string){
        this.url += url
    }

    getURL(url: string){
        return this.url + url
    }
}
