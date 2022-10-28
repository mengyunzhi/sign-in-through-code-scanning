
组件rootComponent:
    通过教师、学期(可以暂不考虑)
    获取dispatches以及牵连数据:
    格式如下
    [{week: 3, day: 2, lesson: 1, teacherId: 1, roomIds: [2, 3], klassIds: [4]}]

组件course-time-select: 
    有data为 conflictData[
        {week: 1, roomIds: [0, 1]}
        {week: 1, roomIds: [0, 1]}
        {week: 1, roomIds: [0, 1]}
        {week: 1, roomIds: [0, 1]}
    ]

组件course-select:
    [
        {id: 1, name:'程序设计', lesson: 12(课时), klassIds: [1, 2, 3]}
    ]



a = [
    {week: 1, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 2, roomIds: [2, 3], klassIds: [4], day: 1, lesson: 1},
    {week: 3, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 3, roomIds: [2, 3], klassIds: [4], day: 2, lesson: 1},
];
1 2 3


selectKlassIds: [1, 2];
a = [
    {week: 1, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 2, roomIds: [2, 3], klassIds: [4], day: 1, lesson: 1},
    {week: 3, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
];

cantSelectWeeks = [1, 3];
a = [
    {week: 1, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 3, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
];


dispatches = [{week: 1, roomIds: [1, 2, 3]}, {week: 2, roomIds: [4, 5]}, {week: 1, roomIds: [0]} ]
选第一周-》过滤出所有的第一周的数据-》所有第一周数据中roomIds取并集（不可选）
再选第二周-》过滤出所有的第二周的数据-》所有第二周数据中roomIds取并集（不可选）—》与第一周数据取并集（不可选）

const selectWeeks = [2, 3]; 
const selectRoomIds = [0, 1];
disableRoomIds = []; 
foreach (week in selectWeeks) {
    //取dispatches中找

}



选教室0-》过滤出所有roomIds包含教室0的-》所有包含教室0的roomIds的数据中week取并集（不可选）
再选教室1-》过滤出所有roomIds包含教室1的-》所有包含教室1的roomIds的数据中week取并集（不可选）-》与选了教室0的数据取并集

两个局部变量：1.当前选中的所有的周  2.当前选中的所有的教室  


教师A 一周一天一节 教室A 班级A
教师B 一周一天一节 教室B 班级B
教师C 一周二天二节 教室B、教室A 班级B、班级A
教师C 二周二天二节 教室A 班级A

conflictData:
教师A [班级A] 一天一节 {week:1, roomIds[教室A、教室B]}
教师B [班级B] 一天一节 {week:1, roomIds[教室A、教室B]}
教师C [班级A,班级B] 二天二节 {week:1, roomIds[教室B、教室A]}
教师C [班级A] 二天二节 {week:2, roomIds[教室A]}


