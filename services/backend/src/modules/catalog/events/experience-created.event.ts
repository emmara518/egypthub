export class ExperienceCreatedEvent {
  constructor(
    public readonly experienceId: string,
    public readonly slug: string,
    public readonly destinationId: string,
  ) {}
}
