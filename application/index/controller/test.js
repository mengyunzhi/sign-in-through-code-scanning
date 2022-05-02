
组件rootComponent:
    通过教师、学期(可以暂不考虑)
    获取dispatches以及牵连数据:
    格式如下
    [{week: 3, day: 2, lesson: 1, roomIds: [2, 3], klassIds: [4]}]

组件course-time-select: 
    有data为 conflictData[
        {week: 1, roomIds: [0, 1]}
    ]

组件course-select:
    [
        {id: 1, name:'程序设计', lesson:12(课时), klassIds: [1, 2, 3]}
    ]



a = [
    {week: 1, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 2, roomIds: [2, 3], klassIds: [4], day: 1, lesson: 1},
    {week: 3, roomIds: [0, 1], klassIds: [1, 2, 3], day: 1, lesson: 1},
    {week: 3, roomIds: [2, 3], klassIds: [4], day: 2, lesson: 1},
];

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



