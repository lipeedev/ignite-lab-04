import { Content } from './content';

describe('notification content entity', () => {
  it('should create a notification content', () => {
    const content = new Content('você recebeu uma nova notificação.');

    expect(content).toBeTruthy();
  });

  it('should not create a notification content with less than 5 characters', () => {
    expect(() => new Content('123')).toThrow();
  });

  it('should not create a notification content with more than 240 characters', () => {
    expect(() => new Content('123'.repeat(241))).toThrow();
  });
});
