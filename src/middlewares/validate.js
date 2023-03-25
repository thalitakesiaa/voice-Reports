function validate(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            // eslint-disable-next-line no-console
            console.log(req.body);
            return next();
        } catch ({ message }) {
            return res.status(400).json({ message });
        }
    };
}

export default validate;
