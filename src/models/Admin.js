import { Schema, model } from 'mongoose';
import Joi from 'joi';

const AdminSchema = new Schema({
    cpf: {
        type: String,
        required: true
    }
});

const Admin = model('Administrador', AdminSchema);

const adminRules = Joi.object({
    role: Joi.string().valid('Administrador', 'administrador').required(),
    // eslint-disable-next-line no-useless-escape
    cpf: Joi.string().pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)).required()
});

export { Admin, adminRules };
