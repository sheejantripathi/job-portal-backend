import Joi from "joi";

export const experienceSchema = Joi.object({
    companyName: Joi.string().required().min(3).max(30),
    position: Joi.string().required().min(3).max(30),
    location: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string().min(3).max(1000),
    isCurrentlyWorking: Joi.boolean(),
    isVerified: Joi.boolean()
});