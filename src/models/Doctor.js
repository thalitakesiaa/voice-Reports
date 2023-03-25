import { Schema } from 'mongoose';
import Joi from 'joi';
import { User, userRules } from './User';

const DoctorSchema = new Schema({
    crm: {
        type: String,
        required: true
    },
});

const Doctor = User.discriminator('Doctor', DoctorSchema);

const doctorRules = userRules.concat(Joi.object({
    role: Joi.string().valid('Doctor', 'doctor'),
    crm: Joi.string().pattern(new RegExp(/^\d{6}\/[A-Z]{2}$/)).required()
}));

export { Doctor, doctorRules };
