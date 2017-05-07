import { AbstractModel } from "./abstract/abstract.model"


export class UserModel extends AbstractModel{
    private _firstName: string
    private _lastName: string
    private _email: string
    private _password: string
    private _username: string
    private _isAdmin: boolean

    constructor(data = {}){
        super(data)
        this.setValues(data)
    }

    public setValues(data){
        super.setValues(data)
        this._firstName = data["_firstName"]
        this._lastName = data["_lastName"]
        this._email = data["_email"]
        this._password = data["_password"]
        this._username = data["_username"]
        this._isAdmin = data["_isAdmin"]
    }

    public get firstName(): string {
        return this._firstName
    }

    public set firstName(v: string) {
        this._firstName = v;
    }

    public get lastName(): string {
        return this._lastName
    }

    public set lastName(v: string) {
        this._lastName = v;
    }

    public get email(): string {
        return this._email
    }

    public set email(v: string) {
        this._email = v;
    }

    public get password(): string {
        return this._password
    }

    public set password(v: string) {
        this._password = v;
    }

    public get username(): string {
        return this._username
    }

    public set username(v: string) {
        this._username = v;
    }

    public get isAdmin() : boolean {
        return this._isAdmin
    }
    
    public set isAdmin(v : boolean) {
        this._isAdmin = v;
    }
    
}

