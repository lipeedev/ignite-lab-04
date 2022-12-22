import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification';
import { SendNotificationUseCase } from '@app/use-cases/send-notification';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
