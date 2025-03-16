import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCT_MICROSERVICE_PORT: string,   
    PRODUCT_MICROSERVICE_HOST: string,
    ORDER_MICROSERVICE_PORT: string,
    ORDER_MICROSERVICE_HOST: string,
}

const envVarsSchema = joi.object({
    PORT: joi.number().required().default(3000),
    PRODUCT_MICROSERVICE_PORT: joi.string().required().default(3001),   
    PRODUCT_MICROSERVICE_HOST: joi.string().required().default('localhost'),
    ORDER_MICROSERVICE_PORT: joi.string().required().default(3002),
    ORDER_MICROSERVICE_HOST: joi.string().required().default('localhost'),
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env, {
    abortEarly: false,
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars : EnvVars = value

export const envs = {
    port: envVars.PORT,
    productsMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
    productsMicroservicePort: parseInt(envVars.PRODUCT_MICROSERVICE_PORT),
    ordersMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
    ordersMicroservicePort: parseInt(envVars.ORDER_MICROSERVICE_PORT),
};