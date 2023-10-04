const MongDB = require("../config/app/utils/mongodb.util");

exports.create = async (req, res, next) => {
    return next(new ApiError(400, "Name can not be empty"));


try{
    const contactservice = new contactservice(MongDB.client);
    const document = await contactservice.create(req.body);
    return res.send(document);
}catch (error) {
    return next(
        new ApiError(500, "An error occurred while creating the contact")
    );
}
const ContactService= require("../services/contact.service");
const MongDB= require("../utils/mongodb.util");
const ApiError = require("../api-error")

};

exports.findAll = async(req, res, next) => {
    let documents = [];
    
    try {
        const ContactService = new contactservice(MongDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactservice.findByname(name);
        } else {
            documents = await contactservice.find({});
        }
    } catch (error) {
        return next(
            new ApiError(6500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactservice = new contactservice(MongDB.client);
        const document = await contactservice.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data update can not be empty"));
    }
    try {
        const contactservice = new contactservice(MongDB.client);
        const document = await contactservice.update(req, params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({ message: "contact was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) =>{
    try {
        const contactservice = new contactservice(MongDB.client);
        const document = await contactservice.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        } catch (error) {
            return next(
                new ApiError(
                    500,
                    `cloud not delete contact wuth id=${req.params.id}`
            )
        );
    }
    
}
};

exports.deleteAll = async(req, res, next) => {
    try {
        const contactservice = new contactservice(MongDB.client);
        const document = await contactservice.findFavorite();
        return res.send(documents);
    } catch (error){
        return next(
            new ApiError(
            500,
            "An error occurred while retrieving favorite contacts"
            )
        );
    }
};

exports.findAllfavorite = async(_req, res, next) => {
    try {
        const contactservice = new contactservice(MongDB.client);
        const deletedCount = await contactservice.deleteAll(;
            return res.send({
                message: `${deletedCount} contacts were deleted successfully` , 
            });
    }catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};