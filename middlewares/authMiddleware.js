import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

    // Get token from header
    const header = req.headers.authorization;
    
    // Check if token exists
    if(!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    // Verify token
    const token = header.split(" ")[1];

    // Check if token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}