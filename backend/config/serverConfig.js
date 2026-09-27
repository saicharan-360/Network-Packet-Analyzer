export const serverConfig = {
  port: Number(process.env.PORT || 4000),
  cors: {
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    headers: 'Content-Type',
  },
};
