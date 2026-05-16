import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

import * as bcrypt from 'bcrypt';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async signup(data: SignUpDTO) {
        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('User already exists');
        }

        if (!data.password) {
            throw new UnauthorizedException('Password is required');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        });

        return {
            name: user.name,
            email: user.email,
            password: user.password
        }
    }
    async signin(data: SignInDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Password Invalid!');
        }

        const acesssToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
        })

        return {
            acesssToken,
        };
    }
}
