import { Schema } from 'mongoose';
import Joi from 'joi';
import { User, userRules } from './User';

const AdminSchema = new Schema({
    cpf: {
        type: String,
        required: true
    }
});

const Admin = User.discriminator('Administrador', AdminSchema);

const adminRules = userRules.concat(Joi.object({
    role: Joi.string().valid('Administrador', 'administrador').required(),
    // eslint-disable-next-line no-useless-escape
    cpf: Joi.string().pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)).required()
}));

export { Admin, adminRules };
