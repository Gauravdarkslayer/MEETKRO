import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

async function bootstrap() {
  // Cors Config
  const whitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://18.119.111.89:4001',
    'http://localhost:4001',
    'http://18.119.111.89:4000',
    'http://172.16.95.21:3000'
  ];

  const corsOptions = {
    origin: (origin: any, callback: any) => {
      console.log({ origin });
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','debug','log']});
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Meetkro example')
    .setDescription('The Meetkro API description')
    .setVersion('1.0')
    .addTag('Meetkro')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
