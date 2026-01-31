const isAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];
    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Akses Ditolak: Hanya Admin' });
    }
};

const isUser = (req, res, next) => {
    const role = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    if (role === 'user' && userId) {
        req.user = { id: userId, role: role };
        next();
    } else if (role !== 'user') {
        res.status(403).json({ message: 'Akses Ditolak: Hanya User' });
    } else {
        res.status(400).json({ message: 'Header x-user-id diperlukan untuk User' });
    }
};

module.exports = { isAdmin, isUser };
