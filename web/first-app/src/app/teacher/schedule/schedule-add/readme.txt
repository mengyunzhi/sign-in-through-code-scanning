注意

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


编辑排课功能：
1、课程和班级是通过schedule_id获得的
2、每个小单元在初始化需要返回数据给父组件courseTime[][]

3、对于conflictData中data.schedule_id和当前schedule_id相等的数据的week和roomIds应该放到selected中
4、可以在loaddata中放到selectedWeeks和selectedRooms中
5、在onWeekChange和onRoomChange中不对schedule_id进行考虑
6、所以其实不同的就是编辑刚开始会有一些默认项
7、不过这些默认项不能被disable, 比如某个week1 room1;
比如此时选择week1 room1不能变灰，可以不执行onRoomChange中对conflictWeek的操作,
如果取消选择week1 在选择room2如果room2对week1有冲突，那week1应该被disable
week   room
  1     1
  2     2
selectedWeeks 1
defaultWeeks  1
conflictWeeks 1

在加载数据的时候筛选出符合当前schedule_id的data，
将符合的week和RoomIds添加到defaultWeeks和defaultRooms中
并且对其中的week和roomIds执行onWeekChange和OnRoomChange,在
这两个方法的执行中，加上如果是默认选择的周和教室的话，就不应该再往conflictRooms和ConflictWeeks中加添加内容

编辑功能测试：
1、其他老师带clazz1在0 0 选择了week: 1,2 room:1,2,4
         带clazz3在0 0 选择了week：3、4 room：4
  当前老师带clazz2在0 0 选择了week: 3,4 room: 1,2,3,
2、如果当前老师点开编辑，那么就会默认选择上week：3、4 以及room:1、2、3 √
  并且week：1、2,room:4应该处于不可选状态,       √
3、如果当前的选择情况是room: 4 week:1、2应该不可选   √
4、如果当前选择情况是week: 1,3 那么room 1、2、4应该不可选 √


