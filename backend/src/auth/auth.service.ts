import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (existing) {
      return this.login({
        phone: dto.phone,
      });
    }

    const count = await this.prisma.user.count();

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        susidNumber: `S+${String(count + 1).padStart(6, '0')}`,
        profile: {
          create: {
            firstName: dto.firstName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return this.generateToken(
      user.id,
      user.phone,
      user.susidNumber,
    );
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Користувача не знайдено',
      );
    }

    return this.generateToken(
      user.id,
      user.phone,
      user.susidNumber,
    );
  }

  private generateToken(
    userId: string,
    phone: string,
    susidNumber: string,
  ) {
    return {
      accessToken: this.jwtService.sign({
        userId,
        phone,
        susidNumber,
      }),
    };
  }
}