import { JWT_KEY } from "../constants/defaultValues";
import jwt from "jsonwebtoken";

export function verifyToken(token){
    jwt.verify(token, JWT_KEY, function(err, decoded) {
        if (err) {
            /*
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
            }
            */
        }
    });
}