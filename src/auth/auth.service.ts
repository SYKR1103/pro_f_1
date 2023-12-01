import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from 'src/interfaces/tokenPayloadInterface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly jwtService : JwtService,
    private readonly configService : ConfigService
  ) {}

    //회원가입
    async createU(c:CreateUserDto) {

      try{
        return await this.userService.createU(c)


      } catch(e) {
        console.log(e)
        throw new HttpException('xxxx', HttpStatus.INTERNAL_SERVER_ERROR)
      }



    }
    //로그인
    async loginU(l:LoginUserDto) {

      try{
        const user = await this.userService.findOneByEmail(l.email)
        const ispwMatched = await user.checkPassword(l.password)
        if (ispwMatched) return user

      } catch(e) {
        console.log(e)
        throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)

      }



    }


    public generateJwtToken(userId : string) {

      const payload : TokenPayloadInterface = {userId}
      const token =  this.jwtService.sign(payload, {

        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        )}`,

      }) 
      return token



    }



}
