import Joi from "joi";

export const educationSchema = Joi.object({
    institution: Joi.string().required().min(3).max(30),
    degree: Joi.string().required().min(3).max(30),
    fieldOfStudy: Joi.string().required().min(3).max(30),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    grade: Joi.string().min(3).max(30),
    activities: Joi.string().min(3).max(1000),
    description: Joi.string().min(3).max(1000),
    isCurrentlyStudying: Joi.boolean(),
    isVerified: Joi.boolean()
});