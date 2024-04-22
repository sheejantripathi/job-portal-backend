import { Request, Response } from "express";
import Joi from "joi";

const validateJoiSchema = (schema: Joi.ObjectSchema) => {
    return(req: Request, res: Response, next: any) => {
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).json({ error: error.details[0].message });
        } else {
            next();
        }
    }
}

export default validateJoiSchema;