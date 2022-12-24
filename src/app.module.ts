import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserService } from './user/user.service';
import { TokenModule } from './token/token.module';
import { AuthorizationModule } from './authorization/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LikeModule } from './like/like.module';
import * as path from 'path';
import { TagModule } from './tag/tag.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get<string>('DATABASE_CONNECTION') as any,
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB_NAME'),
        entities: [__dirname + './**.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: 'all',
        logger: 'advanced-console',
        // ssl: {
        //   require: false,
        //   rejectUnauthorized: false,
        // },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    CommentModule,
    TokenModule,
    AuthorizationModule,
    FileModule,
    LoggerModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    LikeModule,
    TagModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {
}
