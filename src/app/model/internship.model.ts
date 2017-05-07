import { SkillModel } from './skill.model';
import { AbstractModel } from "./abstract/abstract.model";

export class InternshipModel extends AbstractModel {
    private _companyName: String
    private _role: String
    private _requiredSkills: SkillModel[]
    private _preferredSkills: SkillModel[]
    private _compensation: Number
    private _isCompanyPrivate: Boolean
    private _isCompensationPrivate: Boolean
    private _isActive: Boolean
    private _contact: String
    private _area: String
    private _description: String

    constructor(data = {}) {
        super(data)
        this.setValues(data)
    }

    public setValues(data) {
        super.setValues(data)
        this._companyName = data["_companyName"]
        this._role = data["_role"]
        if (data['_requiredSkills']) {
            this._requiredSkills = data['_requiredSkills'].map((sk) => new SkillModel(sk))
        }
        if (data['_preferredSkills']) {
            this._preferredSkills = data['_preferredSkills'].map((sk) => new SkillModel(sk))
        }
        this._compensation = data["_compensation"]
        this._isCompanyPrivate = data["_isCompanyPrivate"]
        this._isCompensationPrivate = data["_isCompensationPrivate"]
        this._isActive = data["_isActive"]
        this._contact = data["_contact"]
        this._area = data["_area"]
        this._description = data["_description"]

    }

    public get color(): String {
        return this.isActive ? "primary" : "warn"
    }

    public get companyName(): String {
        return this._companyName
    }

    public set companyName(v: String) {
        this._companyName = v;
    }

    public get role(): String {
        return this._role
    }

    public set role(v: String) {
        this._role = v;
    }

    public get requiredSkills(): SkillModel[] {
        return this._requiredSkills
    }

    public set requiredSkills(v: SkillModel[]) {
        this._requiredSkills = v;
    }

    public get preferredSkills(): SkillModel[] {
        return this._preferredSkills
    }

    public set preferredSkills(v: SkillModel[]) {
        this._preferredSkills = v;
    }

    public get compensation(): Number {
        return this._compensation
    }

    public set compensation(v: Number) {
        this._compensation = v;
    }

    public get isCompanyPrivate(): Boolean {
        return this._isCompanyPrivate
    }

    public set isCompanyPrivate(v: Boolean) {
        this._isCompanyPrivate = v;
    }

    public get isCompensationPrivate(): Boolean {
        return this._isCompensationPrivate
    }

    public set isCompensationPrivate(v: Boolean) {
        this._isCompensationPrivate = v;
    }

    public get isActive(): Boolean {
        return this._isActive
    }

    public set isActive(v: Boolean) {
        this._isActive = v;
    }

    public get contact(): String {
        return this._contact
    }

    public set contact(v: String) {
        this._contact = v;
    }

    public get area(): String {
        return this._area
    }

    public set area(v: String) {
        this._area = v;
    }

    public get description(): String {
        return this._description
    }

    public set description(v: String) {
        this._description = v;
    }
}