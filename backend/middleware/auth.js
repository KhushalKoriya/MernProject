import jwt  from "jsonwebtoken";

const auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        console.log(token);
        if(!token)
            return res.status(401).json({msg: "No authentication token, access denied"});
        
        const verified = jwt.verify(token, process.env.SECRET);
        if(!verified)
        return res.status(401).json({msg: "Token verification failed, authorization denied"});
        
        req.isUserLoggedIn = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
   
}

export default auth;