export class AbstractModel {
    private _id: String
    private _createdAt: Date
    private _updatedAt: Date

    constructor(data = {}) {
        this.setValues(data)
    }

    public setValues(data) {
        if(!data){
            return
        }
        this._id = data["_id"]
        this._createdAt = data["_createdAt"]
        this._updatedAt = data["_updatedAt"]
    }

    public get id() {
        return this._id
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public set createdAt(v: Date){
        this._createdAt = v
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }

    public set updatedAt(v: Date) {
        this._updatedAt = v;
    }
}