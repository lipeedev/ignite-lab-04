import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
