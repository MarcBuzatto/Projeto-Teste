import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      // O || '' garante que sempre seja string, resolvendo o erro do TS
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    
    // Verifica se o email existe de forma segura
    const email = emails && emails.length > 0 ? emails[0].value : undefined;

    if (!email) {
      // Passamos 'false' ao invés de 'null' para satisfazer o TypeScript
      return done(new UnauthorizedException('Email não fornecido pelo Google'), false);
    }

    const user = {
      email,
      name: name.givenName + ' ' + name.familyName,
      picture: photos && photos.length > 0 ? photos[0].value : '',
      googleId: id,
      accessToken,
    };

    try {
      const validatedUser = await this.authService.validateUser(user);
      done(null, validatedUser);
    } catch (error) {
      done(error, false);
    }
  }
}