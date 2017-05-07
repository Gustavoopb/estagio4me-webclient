import { AbstractModel } from './abstract/abstract.model';

export class SkillModel extends AbstractModel {
    private _name: string

    constructor(data={}){
        super(data)
        this.setValues(data)
    }

    public setValues(data){
        super.setValues(data)
        this._name = data["_name"]
    }

    public get name(): string {
        return this._name
    }
}