import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotificationUseCase } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('cancel notification use case', () => {
  it('should cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not cancel a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    expect(() =>
      cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
