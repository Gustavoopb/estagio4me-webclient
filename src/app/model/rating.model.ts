import { AbstractModel } from "./abstract/abstract.model"
import { InternshipModel } from "./internship.model";
import { UserModel } from "./user.model";

export class RatingModel extends AbstractModel {

    private _stars: Number
    private _internship: InternshipModel
    private _user: UserModel

    constructor(data = {}) {
        super(data)
        this.setValues(data)
    }

    public setValues(data) {
        super.setValues(data)
        this._stars = data["_stars"]
        if (data["_internship"]) {
            this._internship = new InternshipModel(data["_internship"])
        }
        if (data["_user"]) {
            this._user = new UserModel(data["_user"])
        }
    }

    public get stars(): Number {
        return this._stars
    }

    public set stars(v: Number) {
        this._stars = v
    }

    public get internship(): InternshipModel {
        return this._internship
    }

    public set internship(v: InternshipModel) {
        this._internship = v
    }

    public get user(): UserModel {
        return this._user
    }

    public set user(v: UserModel) {
        this._user = v
    }
}
