import { Redis } from '@upstash/redis';

// Create an instance of Redis with proper types
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
});

// const setRedisValue = async (): Promise<void> => {
//   // Set the value in Redis
//   await redis.set('foo', 'bar');

//   // Get the value from Redis
//   const data: string | null = await redis.get('foo');

//   // Handle the returned data
//   if (data !== null) {
//     console.log(`Value retrieved from Redis: ${data}`);
//   } else {
//     console.log('No value found for key "foo".');
//   }
// };

// // Call the function
// setRedisValue().catch((error) => {
//   console.error('Error interacting with Redis:', error);
// });
export default redis;