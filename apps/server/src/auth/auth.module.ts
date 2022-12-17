import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { ValidatorsModule } from '../utils/validators/validators.module';
import { AuthGoogleService } from './auth-google.servive';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

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
    ValidatorsModule,
  ],
  // The providers that will be instantiated by the Nest injector and that may be shared at least across this module
  providers: [AuthService, AuthResolver, JwtStrategy, AuthGoogleService],
  // the subset of providers that are provided by this module and should be available in other modules which import this module.
  exports: [AuthService],
})
export class AuthModule {}
