const RootComponent = {
    template: `
    <form class="" action="{:url('scheduleSave')}" method="post">
        <div class="form-group row">
            <label for="course_id" class="col-sm-2 col-form-label" style="width: 162px">课程</label>
            <div class="col-sm-4">
                <select class="selectpicker form-control col-sm-12" name="course_id" id="course_id" required>
                    <option value="">请选择课程</option>
                    {volist name="Courses" id="_Course" key="key"}
                    <option value="{$_Course->getId()}">{$_Course->getName()}</option>
                    {/volist}
                </select>
            </div>
        </div>
    </form>
    `
}
Vue.createApp(RootComponent).mount('#app')