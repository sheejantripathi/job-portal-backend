import Joi from "joi";
import { experienceSchema } from "./experience.js";
import { educationSchema } from "./education.js";
import { skillsSchema } from "./skills.js";

export const candidateSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(30),
  lastName: Joi.string().required().min(3).max(30),
  dob: Joi.date(),
  password: Joi.string().required().min(8).max(30),
  gender: Joi.string(),
  email: Joi.string().email().messages({'string.pattern.base': `Please enter a valid email`}).required(),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Please Enter a valid Phone Number`}).required(),
  address: Joi.string(),
  experiences: Joi.array().items(experienceSchema),
  skills: Joi.array().items(skillsSchema),
  educations: Joi.array().items(educationSchema)
});