import jwt from "jsonwebtoken";

//this middleware protects private routes
//it checks if the request has a valid token
export const protect = (req, res, next) => {
    //get token from authorization header
    //format: Bearer token
    let token = req.headers.authorization?.split(" ")[1];

    //if token is missing
    if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user id to request object
        req.user = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalid" });
    }
};
