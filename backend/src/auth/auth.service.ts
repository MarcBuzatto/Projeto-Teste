import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(googleUser: GoogleUser) {
    const { email, name, googleId, picture } = googleUser;

    // Busca usuário pelo email
    let user = await this.usersService.findByEmail(email);

    // Se não existir, cria um novo usuário
    if (!user) {
      user = await this.usersService.create({
        email,
        name,
        googleId,
        picture,
      });
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, name: user.name, picture: user.picture };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
