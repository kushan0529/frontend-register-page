import joi from 'joi';

const UserValidationSchema = joi.object({
    userName: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(128).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).+$')).required()
});
const userloginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(128).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).+$')).required()
});

export { UserValidationSchema, userloginValidationSchema };