export default {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:5173'], // of meerdere frontends ...
    maxAge: 3 * 60 * 60,
  },
};
