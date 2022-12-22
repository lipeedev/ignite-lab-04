import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('notification entity', () => {
  it('should create a notification', () => {
    const notification = new Notification({
      content: new Content('nova solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
