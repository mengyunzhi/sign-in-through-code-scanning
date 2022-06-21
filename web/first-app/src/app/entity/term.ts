export class Term {
  id: number;
  name: string;
  state: number;
  startTime: number;
  endTime: number;

  constructor(data = {} as {
    id?: number,
    name?: string,
    state?: number,
    startTime?: number,
    endTime?: number
  }) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.state = data.state as number;
    this.startTime = data.startTime as number;
    this.endTime = data.endTime as number;
  }
}
