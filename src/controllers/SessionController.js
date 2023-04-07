import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import PasswordUtils from '../utils/PasswordUtils';
import resetPass from '../html/resetPassword';
import { transport } from '../utils/ServiceMail';

async function generateToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
}

async function login(req, res) {
    const { email } = req.body;
    const plainTextPassword = req.body.password;

    const user = await User.findOne({ email }).select('+password');
    const passwordsMatch = await PasswordUtils.match(plainTextPassword, user?.password);

    if (!user.isActive) {
        return res.status(400).json({ message: 'Usuário não está ativo no sistema' });
    }

    if (!user || !passwordsMatch) {
        return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    user.password = undefined;
    const token = await generateToken(user.id);

    return res.status(200).json({ user, token });
}

async function resetPassword(req, res) {
    try {
        const { email } = req.body;

        const user = await User.findOneAndUpdate({ email }, { new: true }).select('+password');
        const newPassword = Math.random().toString(36).slice(-10);
        user.password = newPassword;
        user.randomPassword = true;

        if (!user) {
            return res.status(404).json({ message: `Não foi encontrado usuário com o email ${email}` });
        }

        // Precisamos chamar save pra acionar o middleware de criptografia.
        await user.save();

        user.password = undefined;

        transport.sendMail({
            from: 'VOICE REPORTS <reportsvoice@gmail.com>',
            to: email,
            subject: 'Redefinição de Senha - VOICE REPORTS ',
            html: resetPass(user.name, newPassword)
        });
        return res.status(200).json({ message: `Email enviado para ${email} com a nova senha` });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao redefinir a senha, tente novamente!' });
    }
}

export default { login, resetPassword };
