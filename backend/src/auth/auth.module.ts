import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { PrismaModule } from '../prisma/prisma.module';


@Module({

  imports: [
    PrismaModule,

    JwtModule.register({
      secret: 'susidplus_secret_key',
      signOptions:{
        expiresIn:'7d',
      },
    }),
  ],

  providers:[
    AuthService,
    JwtStrategy,
  ],

  controllers:[
    AuthController,
  ],

  exports:[
    AuthService,
  ],

})

export class AuthModule {}
