import ratelimit from "../config/upstash.js";

//rate limiter middleware
//this middleware will limit the number of requests to 10 per 20 seconds
//if the limit is exceeded then it will return 429 status code
//next() is used to pass the control to the next middleware
//try catch block is used to handle errors

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-app-key");
        if (!success) {
            return res.status(429).json({ message: "Too many requests,please try again later" });
        }
        next();
    } catch (error) {
        console.error("Error in rateLimiter middleware", error);
        res.status(500).json({ message: error.message });
    }
}

export default rateLimiter;
