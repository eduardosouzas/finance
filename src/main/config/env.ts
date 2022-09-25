export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://172.17.228.251:30598/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
