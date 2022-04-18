module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('http://localhost/3000');
        
    },
    isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('http://localhost/3000/books/list');
    }
};