import { verifyAccessToken } from "../config/jwt";

const publicRoutes = ["/auth/register", "/auth/login"];

export const authMiddleware = (req, res, next) => {
    if( publicRoutes.includes(req.path) ){
        next();
    }

    const [type, token] = req.headers.authorization.split(" ");

    if ( !token || type !== "Bearer"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const userId = verifyAccessToken(token);
    req.user = userId;

    next();
}
