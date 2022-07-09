<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use think\Db;
use app\index\service\MenuService;
use app\common\model\Teacher;
use app\common\model\Term;
use app\common\model\Course;
use app\common\model\Schedule;

class ScheduleController extends Controller {
	public function page() {
		$params = Request()->param();
		$where = '';
		Db::name('Schedule');
		$query = Db::table('yunzhi_schedule')->alias('schedule')
		->join('yunzhi_schedule_klass scheduleKlass', 'schedule.id = scheduleKlass.schedule_id')
		->join('yunzhi_klass klass', 'scheduleKlass.klass_id = klass.id')
        ->join('yunzhi_course course', 'schedule.course_id = course.id')
        ->join('yunzhi_term term', 'schedule.term_id = term.id')
        ->field('
            schedule.id as schedule_id,
            klass.name as clazz_name,
            course.name as course_name,
            term.name as term_name')
		->order(['schedule.id desc'])->where($where);
        $schedules = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();
        $data['content'] = $schedules;
        $data['length'] = $query->count();
        return json_encode($data);
	}

	public function delete() {
        $id = Request()->param('id/d');
        $schedule = Schedule::get($id);
        $status = $schedule->delete();
        if ($status) {
            return json_encode($schedule);
        } else {
            return $room->getError();
        }
    }

}
