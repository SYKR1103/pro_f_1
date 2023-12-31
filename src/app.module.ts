import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { DblistModule } from './dblist/dblist.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from  '@hapi/joi'

@Module({
  imports: [AuthModule, UserModule, ProductModule, PostModule, DblistModule, ConfigModule.forRoot({


    validationSchema : Joi.object({

      POSTGRES_HOST : Joi.string().required(),
      POSTGRES_PORT : Joi.string().required(),
      POSTGRES_USER : Joi.string().required(),
      POSTGRES_PASSWORD : Joi.string().required(),
      POSTGRES_DB : Joi.string().required(),
      JWT_ACCESS_TOKEN_SECRET : Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRATION_TIME : Joi.string().required(),


    })




  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
