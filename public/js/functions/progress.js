import Swal from "sweetalert2";

export const updateProgress = () => {
  // grab all tasks
  const tasks = document.querySelectorAll('li.tarea');
  //console.log(allTasks);
  if(tasks.length){
    // grab completed tasks
    const completedTasks = document.querySelectorAll('i.completo');
    const progress = Math.round((completedTasks.length/ tasks.length ) * 100);
    // calculate the progress
    const progressBar = document.querySelector('#porcentaje.porcentaje');
    progressBar.style.width = `${progress}%`;

    if(progress === 100){
      Swal.fire(
        'Project Completed',
        'Congratulations, You have completed your tasks!',
        'success'
      );
    }
  }

}