import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './errors/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  const loggingService = new LoggingService();

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .addTag('music')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  process.on('uncaughtException', (err, origin) => {
    loggingService.error(
      `Uncaught Exception (listener): ${err.message}`,
      origin,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection (listener): ${reason}`);
  });

  console.log(`Server is running on port: ${port}`);
}
bootstrap();
