export interface Clazz {
  id: number;
  name: string;
  entranceData: number;
  length: number;
  createTime: number;
  updateTime: number;

  // // tslint:disable-next-line:max-line-length
  // constructor(data= {} as {
  //   id?: number,
  //   name?: string,
  //   entranceData?: number,
  //   length?: number,
  //   createTime?: number,
  //   updateTime?: number
  // }) {
  //   this.id = data.id as number;
  //   this.name = data.name as string;
  //   this.entranceData = data.entranceData as number;
  //   this.length = data.length as number;
  //   this.createTime = data.createTime as number;
  //   this.updateTime = data.updateTime as number;
  // }
}
