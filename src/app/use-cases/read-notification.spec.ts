import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotificationUseCase } from './read-notification';

describe('read notification use case', () => {
  it('should read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not read a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    expect(() =>
      readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
