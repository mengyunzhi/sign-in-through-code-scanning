import {Injectable} from '@angular/core';
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  confirm(callback?: (state?: boolean) => void, description: string = '该操作不可逆，请谨慎恒操作', title: string = '请确认',
          confirmButtonText = '确定', cancelButtonText = '取消', options = {icon: 'question' as SweetAlertIcon}): void {
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
}
