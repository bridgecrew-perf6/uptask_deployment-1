import Swal from 'sweetalert2';
import axios from 'axios';

const deleteProjectBtn = document.querySelector('#eliminar-proyecto');

if(deleteProjectBtn){
  deleteProjectBtn.addEventListener('click', e => {
    const urlProject = e.target.dataset.projectUrl;

    Swal.fire({
      title: 'Are you wanna delete it?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${location.origin}/projects/${urlProject}`;
        console.log(url)
        axios.delete(url, { params: {urlProject} }).then( response => {
          //console.log(response)
          Swal.fire(
            'Project Deleted!',
              response.data,
            'success'
          );
          setTimeout(() =>{
            window.location.href = "/";
          }, 3000)
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Deleted was not made successfully'
          })
        });


      }
    })
  })
}

export default deleteProjectBtn;