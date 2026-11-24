import { verifyAccessToken } from "../config/jwt.js";

const publicRoutes = ["/auth/register", "/auth/login"];

export const authMiddleware = async (req, res, next) => {
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const [type, token] = authorization.split(" ");

    if (!token || type !== "Bearer") {
        return res.status(401).json({message: "Unauthorized"});
    }

    const userId = await verifyAccessToken(token);
    req.user = userId;

    return next();
}
