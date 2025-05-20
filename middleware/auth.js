const jwt = require("jsonwebtoken");

//validering av token
function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //felmeddelande om token inte skulle skickas med
    if(!token) {
        return res.status(401).json({message: "Ingen token - ingen behörighet"});
    }

    //korrekt token och skickas till skyddad token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({message: "ogiltig JWT"});
        }

        req.user = user;
        next();
    });
}

//exporterar
module.exports = authToken;
