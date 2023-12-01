import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

constructor(
    private authservice : AuthService
) {

    super({


        usernamefield : 'email'

    })


}

    async validate(email:string, password:string) : Promise<User> {
        return await this.authservice.loginU({email, password})
    }



}
