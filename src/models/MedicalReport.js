import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { userRules } from './User';

const MedicalReportSchema = new Schema(
    {
        // Numero do prontuário
        MedicalRecordNumber: {
            type: Number,
            required: true
        },

        // Tipo do exame
        TypeExam: {
            type: String,
            required: true
        },

        // Laudo
        Report: {
            type: String,
            required: true
        },

        // Medico responsável
        CrmDoctor: {
            type: String,
            required: true
        },

        isFinished: {
            type: Boolean,
            required: true
        },

        isArchived: {
            type: Boolean,
            required: true
        },

        isReviewed: {
            type: Boolean,
            required: true
        }
    },

    { timestamps: {} },

);

const MedicalReport = model('MedicalReport', MedicalReportSchema);

const MedicalReportRules = userRules.concat(Joi.object({
    role: Joi.string().valid('Doctor', 'doctor'),
    crm: Joi.string().pattern(new RegExp(/^\d{6}\/[A-Z]{2}$/)).required()
}));

export { MedicalReport, MedicalReportRules };
