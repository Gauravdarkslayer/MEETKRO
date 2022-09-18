"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../.env') });
async function bootstrap() {
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
        origin: (origin, callback) => {
            console.log({ origin });
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log']
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Meetkro example')
        .setDescription('The Meetkro API description')
        .setVersion('1.0')
        .addTag('Meetkro')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors(corsOptions);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map