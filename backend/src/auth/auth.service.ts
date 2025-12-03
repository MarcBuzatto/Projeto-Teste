import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
