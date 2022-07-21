import {Injectable} from '@angular/core';
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) {
  }

  /** 所有路由信息 */
  public routeStates: Array<{url: string, state: {[k: string]: any} | undefined}> = [];
  /** 当前是否处于后退状态 */
  private isBack = false;

  /**
   * 清空当前路由信息
   */
  clearCurrentRoute(): void {
    this.routeStates.pop();
  }

  /** 路由回退 */
  back(url = '../', route = null): void {
    /** 清空当前路由信息 */
    this.clearCurrentRoute();
    if (this.routeStates.length > 0) {
      /** 获取待后退的url */
      const state = this.routeStates[this.routeStates.length - 1];
      /** 设置后退状态 */
      this.isBack = true;
      /** 路由跳转 */
      this.router.navigateByUrl(state.url, {state: state.state});
    } else if (route !== null) {
      this.router.navigate([url], {relativeTo: route});
    }
  }

  /**
   * 是否确认提示框
   * @param callback  回调
   * @param description  描述
   * @param title 标题
   */
  confirm(callback?: (state?: boolean) => void,
          description: string = '该操作不可逆，请谨慎操作',
          title: string = '请确认',
          confirmButtonText = '确定',
          cancelButtonText = '取消',
          options = {icon: 'question' as SweetAlertIcon}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: options.icon,
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: true,
      cancelButtonText,
      cancelButtonColor: '#6C757D'
    }).then((result: SweetAlertResult) => {
      if (callback) {
        callback(result.isConfirmed);
      }
    });
  }

  /**
   * 操作成功提示框
   * @param callback  回调
   * @param description  描述
   * @param title  标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功', option = {confirmButtonText: '确定'}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: option.confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }
  /**
   * 操作失败提示框
   * @param callback  回调
   * @param description  描述
   * @param title  标题
   */
  error(callback?: () => void, description: string = '', title: string = '操作失败'): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'error',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }
}
