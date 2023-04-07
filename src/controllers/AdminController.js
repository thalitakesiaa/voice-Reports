import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import isMalformed from '../middlewares/isMalformed';
import { Admin } from '../models/Admin';
import { Doctor } from '../models/Doctor';

let createUser;

async function create(req, res) {
    try {
        if (req.emailInUse) {
            return res.status(400).json({ message: `O email ${req.body.email} já está em uso.` });
        }

        // Apenas administradores podem criar usuarios
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);

        if (!(user.role === 'Administrador')) {
            return res.status(400).json({ message: 'Usuário não tem permissão para criar novos usuários' });
        }

        if (req.body.role === 'Administrador') {
            createUser = await Admin.create(req.body);
        } else {
            createUser = await Doctor.create(req.body);
        }

        user.password = undefined;

        return res.status(201).json(createUser);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

export default {
    create,
};
