import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // TODO Change this to async load & using of ConfigModule
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  // TODO What are providers? What is the difference between providers and exports and imports?
  // TODO Reorganize module structure
  providers: [AuthService, JwtStrategy, AuthResolver, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
