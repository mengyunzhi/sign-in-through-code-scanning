export class Student {
  id: number;
  userId: number;  // todo User
  klassId: number; // todo Klass
  sno: number;
  state: boolean;
  createTime: number;
  updateTime: number;

  // tslint:disable-next-line:max-line-length
  constructor(data: {id?: number, userId?: number, klassId?: number, sno?: number, state?: boolean, createTime?: number, updateTime?: number} = {} as {
    id?: number,
    userId?: number,
    klassId?: number,
    sno?: number,
    state?: boolean,
    createTime?: number,
    updateTime?: number
  }) {
    this.id = data.id as number;
    this.userId = data.userId as number;
    this.klassId = data.klassId as number;
    this.sno = data.sno as number;
    this.state = data.state as boolean;
    this.createTime = data.createTime as number;
    this.updateTime = data.updateTime as number;
  }
}
