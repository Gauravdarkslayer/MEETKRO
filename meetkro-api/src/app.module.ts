import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthGuard } from './helpers/guards/admin-jwt.guard';
import { BookingSlotsModule } from './booking-slots/booking-slots.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_DB_HOST || 'localhost'}:${
        process.env.MONGODB_DB_PORT || '27017'
      }/${process.env.MONGODB_DB_NAME || 'meetkro'}?authSource=admin&w=1`,
      process.env.MONGODB_USER && {
        user: process.env.MONGODB_USER || 'root',
        pass: process.env.MONGODB_PASS || 'gaurav#123',
      },
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../user/build/'),
    }),
    AdminModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'www.gaurav10bhojwani@gmail.com',
            pass: 'ebaospjvxmxtqhkl',
          },
        },
        // template: {
        //   dir: path.join(__dirname, 'templates'),
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: '#asda#EFHI$Tgds9#Rg@#%((!!0',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    BookingSlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminAuthGuard],
})
export class AppModule {}
