// Prisma 7 Configuration
export default {
  databases: {
    default: {
      provider: 'sqlite',
      url: 'file:./prisma/dev.db',
    },
  },
};
