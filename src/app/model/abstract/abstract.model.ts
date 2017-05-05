export class AbstractModel {
    private _id: String
    private _createdAt: Date
    private _updatedAt: Date

    constructor(data = {}) {
        for (let key in data) {
            this[key] = data[key]
        }
    }

    public setValues(data = {}) {
        for (let key in data) {
            this[key] = data[key]
        }

    }

    public get id() {
        return this._id
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }

    public set updatedAt(v: Date) {
        this._updatedAt = v;
    }
}