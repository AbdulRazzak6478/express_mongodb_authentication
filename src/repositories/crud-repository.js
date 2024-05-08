const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository{
 
    constructor(model)
    {
        this.model = model;
    }
    
    async create(data)
    {
        const response = this.model.create(data);
        return response;
    }
    async getAll()
    {
        const response = await this.model.find({});
        return response;
    }
    async get(id)
    {
        const response = this.model.findById(id);
        if(!response)
        {
            throw new AppError("Not able to found the resource",StatusCodes.NOT_FOUND)
        }
        return response;
    }

}
module.exports = CrudRepository;