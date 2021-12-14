module.exports = {
    authentication: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }else{ 
            res.json({error:"Please log in first! ssssssr "+ req.user})
        }
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.json({success:"okayyyyyyyyyyyyyy!"})
    }
};