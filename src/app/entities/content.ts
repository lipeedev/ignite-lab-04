export class Content {
  constructor(private readonly content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length error.');
    }
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  get value(): string {
    return this.content;
  }
}
