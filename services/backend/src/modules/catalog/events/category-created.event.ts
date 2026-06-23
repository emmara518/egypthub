export class CategoryCreatedEvent {
  constructor(
    public readonly categoryId: string,
    public readonly slug: string,
  ) {}
}
