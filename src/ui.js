class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.body = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts){
    let output = '';
    posts.forEach( post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title} </h4>
            <p class="card-text"> ${post.body} </p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>  
      `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message,className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.postsContainer');
    container.insertBefore(div,this.post);

    setTimeout(() => {
      this.clearAlert();
    },2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) {
      currentAlert.remove();
    }
  }
  clearFields() {
    this.titleInput.value = '';
    this.body.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.body.value = data.body;
    this.idInput.value = data.id;
    this.changeFormState('edit');
  }

  changeFormState(type) {
    console.log(type);
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      // create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // get parent
      const parent = document.querySelector('.card-form');
      // element to insert before
      const formEnd = document.querySelector('.form-end');
      parent.insertBefore(button,formEnd);
    }
    else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      const cancel = document.querySelector('.post-cancel');
      if(cancel) {
        cancel.remove();
      } 
      this.clearIdInput();
      this.clearFields();
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }
}
export const ui = new UI();