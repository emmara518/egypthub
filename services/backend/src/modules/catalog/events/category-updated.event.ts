export class CategoryUpdatedEvent {
  constructor(
    public readonly categoryId: string,
    public readonly slug: string,
  ) {}
}
