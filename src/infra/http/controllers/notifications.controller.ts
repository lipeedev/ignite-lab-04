import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification';
import { SendNotificationUseCase } from '@app/use-cases/send-notification';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRepicientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) {}

  @Patch('/cancel/:id')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRepicientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch('read/:id')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch('unread/:id')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
