import { AbstractModel } from './abstract/abstract.model';

export class SkillModel extends AbstractModel {
    private _name: string

    public get name(): string {
        return this._name
    }
}