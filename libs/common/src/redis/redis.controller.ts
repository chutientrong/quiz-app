import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { RedisService } from './redis.service';

@ApiTags('📦 Redis')
@Controller('redis')
export class RedisController {
    constructor(private readonly redisService: RedisService) {}

    @Get('reset-redis')
    @ApiOperation({ summary: 'Reset Redis cache' })
    @ApiResponse({ status: 200, description: 'Redis cache cleared' })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'INTERNAL_SERVER_ERROR.',
        type: Error,
    })
    async resetRedis() {
        try {
            await this.redisService.reset();
            return 'Redis cache cleared';
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get a key from Redis' })
    @ApiQuery({
        name: 'key',
        required: true,
        description: 'The key to retrieve from Redis',
    })
    @ApiResponse({
        status: 200,
        description: 'The value associated with the key',
    })
    @ApiNotFoundResponse({ status: 404, description: 'Key not found' })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'INTERNAL_SERVER_ERROR.',
        type: Error,
    })
    async getKey(@Query('key') key: string) {
        try {
            const value = await this.redisService.get(key);
            if (value === null) {
                throw new NotFoundException(`Key ${key} not found`);
            }
            return value;
        } catch (error) {
            this.handleError(error);
        }
    }

    @Delete()
    @ApiOperation({ summary: 'Delete a key from Redis' })
    @ApiQuery({
        name: 'key',
        required: true,
        description: 'The key to delete from Redis',
    })
    @ApiResponse({ status: 200, description: 'The deleted key' })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'INTERNAL_SERVER_ERROR.',
        type: Error,
    })
    async deleteKey(@Query('key') key: string) {
        try {
            await this.redisService.del(key);
            return `${key} deleted`;
        } catch (error) {
            this.handleError(error);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Set a key in Redis' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                key: { type: 'string', description: 'The key to set in Redis' },
                value: { type: 'string', description: 'The value to set for the key' },
            },
            required: ['key', 'value'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'The key-value pair has been set in Redis',
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'INTERNAL_SERVER_ERROR.',
        type: Error,
    })
    async setKey(@Body() body: { key: string; value: string }) {
        try {
            await this.redisService.set(body.key, body.value);
            return `Key ${body.key} set with value ${body.value}`;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error instanceof Error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            throw new HttpException(
                'An unexpected error occurred.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
