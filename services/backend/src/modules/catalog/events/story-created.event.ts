export class StoryCreatedEvent {
  constructor(
    public readonly storyId: string,
    public readonly slug: string,
  ) {}
}
