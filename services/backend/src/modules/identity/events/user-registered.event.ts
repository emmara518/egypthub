export class UserRegisteredEvent {
  constructor(
    public readonly userId: string,
    public readonly emailHash: string,
    public readonly role: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
