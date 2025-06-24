
import Swal from 'sweetalert2';

const Alert = (type,mssg) => {
    Swal.fire({
        title: type,
        text: mssg,
        icon: type,
        confirmButtonText: 'OK'
      })
      
};

export default Alert;
