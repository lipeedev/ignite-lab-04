import { Notification } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notification-repository';

export class InMemoryNotificationRepositoy implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    return (
      this.notifications.find(
        (notification) => notification.id === notificationId,
      ) || null
    );
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
