export class OfferCreatedEvent {
  constructor(
    public readonly offerId: string,
    public readonly slug: string,
  ) {}
}
