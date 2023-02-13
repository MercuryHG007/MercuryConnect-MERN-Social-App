import jwt from "jsonwebtoken";

// VERIFY TOKEN MIDDLEWARE TO AVOID UNAUTHORIZED ACCESS
export const verifyToken = async (req, res, next) => {
    try{
        const token = req.header('Authorization')
        
        if(!token) {
            return res.status(403).json({ message: "Not Authorized!! Access Denied" });
        }

        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(500).json({ error: err.message}) 
    }
}