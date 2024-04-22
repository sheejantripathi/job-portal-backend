import Joi from "joi";

export const skillsSchema = Joi.object({
    skill: Joi.string().required().min(3).max(1000),
    yearsOfExperience: Joi.number().required().min(0).max(100),
    isVerified: Joi.boolean()
});