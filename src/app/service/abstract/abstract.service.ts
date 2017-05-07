import { environment } from "../../../environments/environment";

export abstract class AbstractService {
    private _url: String = environment.production ? 'https://estagio4me-server.herokuapp.com' : 'http://localhost:3000'
    private _path: String

    constructor(path: string) {
        this._path = path

    }

    public getURL(url: Array<String>) {
        return this._url.concat(this._path.concat(url.join("/")))
    }
}