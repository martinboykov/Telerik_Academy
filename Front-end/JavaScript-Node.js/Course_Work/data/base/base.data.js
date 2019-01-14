const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    getAll() {
        return this.collection.find()
            .toArray();
    }

    create(model) {
        // validation database
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }

        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
