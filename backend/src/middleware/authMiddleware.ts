import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import fs from "fs"
import path from "path"

const SECRET_KEY: Secret = fs.readFileSync(path.join(__dirname, '..', '..', 'credentials', 'private.pem'));;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.token = decoded;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};