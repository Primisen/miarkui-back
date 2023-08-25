import { Request } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

class SignInService {
    private user!: User;
    private token!: string;

    async signIn(request: Request) {
        if (await this.credentialsIsCorrect(request.body.email, request.body.password))
            return this.createToken(this.user);
    }

    private async credentialsIsCorrect(email: string, password: string) {
        return (await this.emailIsExists(email)) && (await this.passwordIsCorrect(password));
    }

    private async emailIsExists(email: string) {
        this.user = <User>await User.findOne({
            where: {
                email: email,
            },
        });
        return this.user != null;
    }

    private async passwordIsCorrect(password: string) {
        return await bcrypt.compare(password, this.user.password);
    }

    private createToken(user: User) {
        this.token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );
        return this.token;
    }
}

export default new SignInService();
