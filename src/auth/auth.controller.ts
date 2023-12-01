import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('/signup')
  async createU(@Body() c:CreateUserDto) {
    return await this.authService.createU(c)
  }

  //@UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginU(@Body() l:LoginUserDto) {
  //  async loginU(@Req() r:RequestWithUser) {
    
  // user의 findbyemail/userentity checkpassword - authservice login - local-auth strategy - authcontroller의 데코레이터
  //원래는 login함수 쓰지만 데코레이터로 대체하니까 그냥 통과된것들에 토큰발행하는 함수만 남기기
  
      
      //const {user} =r
      const user = await this.authService.loginU(l)
      const token = await this.authService.generateJwtToken(user.id)
      return {user}
      
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async UserInfo(@Req() r:RequestWithUser) {
    return r.user
  }


}
