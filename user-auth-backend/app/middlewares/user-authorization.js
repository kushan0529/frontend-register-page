const authorizeUser = (permittedRoles) => {
    return (req, res, next) => {
        if (permittedRoles.includes(req.role)) {
            next();
        } else {
            res.status(403).json({ error: 'Acess Denied' });
        }
    };
};

export default authorizeUser;