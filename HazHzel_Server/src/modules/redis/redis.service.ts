import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: '127.0.0.1',
            port: 6379,
            enableOfflineQueue: false,
            maxRetriesPerRequest: 1,
            connectTimeout: 1000,
        });

        this.client.on('connect', () => {
            console.log('Redis Connected!');
        });

        this.client.on('error', (err) => {
            console.error(err);
        });
    }

    onModuleDestroy() {
        this.client.disconnect();
    }
    async set(key: string, value: string, ttl?: number) {
        try {
            if (ttl) {
                await this.client.set(key, value, 'EX', ttl);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            console.error('Redis set error: can not set key ${key}', error);
        }
    }

    async get(key: string) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Redis get error: can not get key ${key}', error);
            return null
        }
    }

    async del(key: string) {
        try {
            return await this.client.del(key);
        }
        catch (error) {
            console.error('Redis del error: can not delete key ${key}', error);
        }
    }

    async setIfNotExist(key: string, value: string, ttlSeconds: number): Promise<boolean> {
        try {
            const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
            return result === 'OK';
        } catch (error) {
            console.error(`Redis setIfNotExist error: can not set key ${key}`, error);
            return false;
        }
    }
}