import jwt from 'jsonwebtoken';
import validate from './validate';
import { User } from '../models/User';
import isMalformed from './isMalformed';

/**
 *
 * @param {*} roleSchemas Objeto em que cada chave é o nome de uma role e os
 * valores são Schemas de validação.
 */
function validateUser(roleSchemas) {
    return async (req, res, next) => {
        const role = req.body.role?.toLowerCase();
        if (!role) {
            return res.status(400).json({ message: 'You must provide a role.' });
        }

        const validRoles = Object.keys(roleSchemas).map(roleName => roleName.toLowerCase());

        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: `Role attribute must be one of ${validRoles}` });
        }

        // Apenas administradores podem criar usuarios
        const header = req.headers.authorization;
        const [type, token] = header.split(' ');

        isMalformed(type, token);

        const decoded = jwt.verify(token, process.env.SECRET);

        try {
            const user = await User.findById(decoded.id);
            if (!user.isActive) {
                return res.status(400).json({ message: 'Usuário não está ativo para acessar o sistema' });
            }
        } catch (message) {
            return res.status(500).json({ message });
        }

        const schema = roleSchemas[role];

        return validate(schema)(req, res, next);
    };
}

export default validateUser;
