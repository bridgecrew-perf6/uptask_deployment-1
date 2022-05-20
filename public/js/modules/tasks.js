import axios from "axios";
import Swal from 'sweetalert2';
import { updateProgress } from '../functions/progress';

const tasks = document.querySelector('.listado-pendientes');

if(tasks){
  tasks.addEventListener('click', async e => {

    if(e.target.classList.contains('fa-check-circle')){
      const icon = e.target;
      const taskId = icon.dataset.taskId;
      //console.log(taskId);
      const url = `${location.origin}/tasks/${taskId}`;
      console.log(url);
      //axios.patch(url, { taskId }).then( res => { console.log(res); } );
      const response = await axios.patch(url, { taskId });

      if(response.status === 200){
        //alert();
        icon.classList.toggle('completo')
        updateProgress()
      }
    }

    if(e.target.classList.contains('fa-trash')){
      const row = e.target.parentElement.parentElement;
      const taskId = e.target.dataset.taskId;
      console.log(row, taskId);
      const confirm = await Swal.fire({
        title: 'Are you wanna delete it?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });
      //console.log(confirm);
      if(!confirm.isConfirmed){
        return;
      }
      const url = `${location.origin}/tasks/${taskId}`;
      const response = await axios.delete(url, { params: { taskId } });
      console.log(response);
      if(response.status === 200){
        Swal.fire(
          'Task Deleted!',
            response.data,
          'success'
        );
        row.remove();
        updateProgress()
      }
      console.log('post');
    }
  })
}

export default tasks;