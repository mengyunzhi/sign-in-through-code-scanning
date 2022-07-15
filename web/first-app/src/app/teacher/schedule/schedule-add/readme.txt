注意：
thinkphp的周数为1基，
angular的周数为0基

以下为新增排课功能：

   父组件内容 ：  课程选择， 班级选择， 时间选择框
子组件（unit）：  上课周选择，教室选择

父组件传递给子组件的数据：
day: number
lesson: number
weeks: number[]
rooms: Room[],
teacher: Teacher,
clazzes: number[]
conflictData: {week: number, clazzIds: number[], roomIds: number[], teacher_id: number}
// 如果teacher_id对应当前teacher，那么在week这一周应该disabled
// 如果选中的某个班级被包含在clazzIds， 那么在week这一周应该disabled
// 如果没有选择clazzIds中的班级并且teacher_id不对应当前teacher, 那么如果选这一周，其中的roomIds应该disabled

// 但是后台的addRoomIds在新增排课时候将所有的同day同lesson的roomIds求并集了。



子组件传递给父组件的数据：
(outer)="getFooterRun($event)"   $event: {day: number, lesson: number, weeks: number[], roomIds: number[]}
