export class DestinationCreatedEvent {
  constructor(
    public readonly destinationId: string,
    public readonly slug: string,
  ) {}
}
