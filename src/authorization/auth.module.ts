import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';

@Module({
  exports: [JwtModule],
  imports: [UserModule, TokenModule, AuthorizationModule, UserModule, JwtModule.register({})],
  providers: [SecurityService],
  controllers: [SecurityController],
})
export class AuthorizationModule {}
