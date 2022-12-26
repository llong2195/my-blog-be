import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({credentials: true, origin: ["https://my-blog-fe.vercel.app/","https://*.vercel.app/*","*" ]});

  await app.listen(PORT, () => console.log(`Server running om port: ${PORT}`));

}

bootstrap();
