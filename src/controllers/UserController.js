import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import isMalformed from '../middlewares/isMalformed';

async function alterUser(req, res) {
    try {
        const userId = req.params.id;
        const { body } = req;
        // Apenas administradores editar role
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);
        let userSolicitor = await User.findById(decoded.id);

        if (!(userSolicitor.role === 'Administrador') && (body.role != null)) {
            return res.status(400).json({ message: 'Usuário não tem permissão para editar a role' });
        }

        if (body.isActive) {
            return res.status(400).json({ message: 'Usuário não pode alteração a ativação' });
        }

        const newEmail = await User.findOne({ email: body.email });

        if (newEmail != null) {
            return res.status(409).json({ message: `Esse email ${body.email} já está em uso` });
        }

        if ((userSolicitor.id === userId && req.body.password != null)) {
            userSolicitor = await User.findByIdAndUpdate(userId, body, { new: true }).select('+password');

            await userSolicitor.save();
            userSolicitor.password = undefined;
        } else {
            return res.status(400).json({ message: 'Usuário não tem permissão para editar a senha de outro usuário' });
        }

        return res.status(200).json(userSolicitor);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function isActive(req, res) {
    try {
        // Apenas administradores ativar/desativar usuário
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);

        if (!(user.role === 'Administrador')) {
            return res.status(400).json({ message: 'Usuário não tem permissão para ativar ou desativar usuário' });
        }

        let userId = await User.findById(req.params.id);
        if (!userId) {
            return res.status(409).json({ message: 'Esse usuário não existe no sistema ' });
        }

        if (userId.isActive) {
            userId = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        } else {
            userId = await User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
        }

        return res.status(200).json(userId);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getAll(req, res) {
    try {
        // Apenas administradores podem visualizar usuários
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);

        if (!(user.role === 'Administrador')) {
            return res.status(400).json({ message: 'Usuário não tem permissão para visualizar usuários cadastrados no sistema' });
        }

        const users = await User.find();
        return res.status(200).json(users);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getById(req, res) {
    try {
        // Apenas administradores podem visualizar usuario
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);

        if (!(user.role === 'Administrador')) {
            return res.status(400).json({ message: 'Usuário não tem permissão para visualizar usuário cadastrado no sistema' });
        }

        const userId = await User.findById(req.params.id);

        if (!userId) {
            return res.status(404).json({ message: `Não há usuário com o id ${req.params.id}.` });
        }

        return res.status(200).json(userId);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function remove(req, res) {
    try {
        const user = await User.findByIdAndRemove(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

export default {
    alterUser,
    isActive,
    remove,
    getAll,
    getById
};
