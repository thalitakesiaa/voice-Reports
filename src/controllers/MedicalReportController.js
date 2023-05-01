import { MedicalReport } from '../models/MedicalReport';

async function createReport(req, res) {
    try {
        const report = await MedicalReport.create(req.body);
        return res.status(201).json(report);
    } catch (message) {
        return res.status(500).json(message);
    }
}

async function geAllReport(req, res) {
    try {
        const reports = await MedicalReport.find();
        return res.status(200).json(reports);
    } catch (message) {
        return res.status(500).json(message);
    }
}

export default { geAllReport, createReport };
