import { forwardRef, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // The list of imported modules that export the providers which are required in this module
  imports: [
    // To resolve circular dependencies
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
  ],
  // The providers that will be instantiated by the Nest injector and that may be shared at least across this module
  providers: [AuthService, AuthResolver, JwtStrategy],
  // the subset of providers that are provided by this module and should be available in other modules which import this module.
  exports: [AuthService],
})
export class AuthModule {}
