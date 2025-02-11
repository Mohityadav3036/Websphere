import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    console.log("insider the auth")
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ message: 'Access token is required.' });
    }
    

    try {
        // Use the correct secret for verifying the token (access token secret
        
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(token, secretKey); // Verify the token   
       

        // const decoded1 = jwt.decode(token);
        
        // Attach user info (e.g., userId) to req.user
        req.user = { 
            id: decoded._id, // Assuming the payload includes `_id`
            email: decoded.email, // You can also store email if needed
            name: decoded.name, // You can store name too, depending on your use case
            exp: decoded.exp,
        };

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
