import { PassportStrategy } from "@nestjs/passport";
import { Strategy} from 'passport-jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt'
import { UserService } from "src/user/user.service";
import { TokenPayloadInterface } from "src/interfaces/tokenPayloadInterface";
import { User } from "src/user/entities/user.entity";
import { Injectable } from "@nestjs/common";



@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configservice : ConfigService,
        private readonly userservice : UserService
    ) {

        super({

            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configservice.get("JWT_ACCESS_TOKEN_SECRET")

        })

    }

    async validate(payload : TokenPayloadInterface) : Promise<User> {

        return await this.userservice.findOneById(payload.userId)

    }

}