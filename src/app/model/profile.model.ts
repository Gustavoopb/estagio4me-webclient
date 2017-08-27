import { AbstractModel } from "./abstract/abstract.model";
import { SkillModel } from './skill.model';
import { UserModel } from "./user.model";

export class ProfileModel extends AbstractModel {

    private _experiencedSkills: Array<SkillModel>
    private _likedSkills: Array<SkillModel>
    private _user: UserModel

    constructor(data = {}) {
        super(data)
    }

    public setValues(data) {
        super.setValues(data)
        if (data['_experiencedSkills']) {
            this._experiencedSkills = data['_experiencedSkills'].map((sk) => new SkillModel(sk))
        }
        if (data['_likedSkills']) {
            this._likedSkills = data['_likedSkills'].map((sk) => new SkillModel(sk))
        }
        if (data['_user']) {
            this._user = new UserModel(data['_user'])
        }
    }

    public get experiencedSkills(): Array<SkillModel> {
        return this._experiencedSkills
    }

    public set experiencedSkills(v: Array<SkillModel>) {
        this._experiencedSkills = v;
    }

    public get likedSkills(): Array<SkillModel> {
        return this._likedSkills
    }

    public set likedSkills(v: Array<SkillModel>) {
        this._likedSkills = v;
    }

    public get user(): UserModel {
        return this._user
    }

    public set user(v: UserModel) {
        this._user = v;
    }

}