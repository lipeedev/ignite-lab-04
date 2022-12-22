import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotificationUseCase } from './unread-notification';

describe('unread notification use case', () => {
  it('should unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not unread a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    expect(() =>
      unreadNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
