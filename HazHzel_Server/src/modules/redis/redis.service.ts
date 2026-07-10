import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: '127.0.0.1',
            port: 6379,
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
        if (ttl) {
            await this.client.set(key, value, 'EX', ttl);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async del(key: string) {
        return this.client.del(key);
    }
}