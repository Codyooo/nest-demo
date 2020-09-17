/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:37:14
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 16:02:44
 */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/controllers/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO, LoginDTO, UserRoleChangeDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password) {
    const user = await this.userRepo.findOne({ username });
    if (!user) return null;
    const isValid = await user.comparePassword(password);
    if (isValid) return user;
    return null;
  }

  async register(registerDTO: RegisterDTO) {
    const user = this.userRepo.create(registerDTO);

    await user.save();

    return {
      ...user.toJSON(),
      access_token: this.jwtService.sign({
        username: user.username,
        id: user.id,
        role: user.role,
      }),
    };
  }

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('');
    return {
      access_token: this.jwtService.sign({
        username,
        id: user.id,
        role: user.role,
      }),
    };
  }

  async getAllUsers() {
    const user = await this.userRepo.find();
    return user;
  }

  async roleChange(payload: UserRoleChangeDTO) {
    const { username, role } = payload;
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new NotFoundException('user not found');

    user.role = role;

    await user.save();

    return user;
  }
}
