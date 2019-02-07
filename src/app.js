import { http } from './http';
import { ui } from './ui';
// Get posts on DOM load 

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click',submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click',deletePost);

function getPosts() {
  http.get('http://localhost:3000/posts')
      .then( data => ui.showPosts(data))
      .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  // create post
  http.post('http://localhost:3000/posts', data)
      .then( data => {
        ui.showAlert('Post success','alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
}

function deletePost(e) {
  const post = e.target;

  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
          .then( data => {
            ui.showAlert('Post deleted', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}