import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();
// Create a new ratelimit instance
//slidingWindow is used to limit the number of requests in a time window
//100 is the number of requests
//"60 s" is the time window
//Redis.fromEnv() is used to connect to the Redis database
//export default ratelimit is used to export the ratelimit instance
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;