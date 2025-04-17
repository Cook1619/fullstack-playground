import redisClient from '../src/redisClient';

describe('Redis Client', () => {
    beforeAll(async () => {
        await redisClient.connect();
    });

    afterAll(async () => {
        await redisClient.quit();
    });

    it('should set and get a value from Redis', async () => {
        await redisClient.set('testKey', 'testValue', { EX: 10 });
        const value = await redisClient.get('testKey');
        expect(value).toBe('testValue');
    });

    it('should expire a key after the specified time', async () => {
        await redisClient.set('tempKey', 'tempValue', { EX: 1 });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
        const value = await redisClient.get('tempKey');
        expect(value).toBeNull();
    });
});