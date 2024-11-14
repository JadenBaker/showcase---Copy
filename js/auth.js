const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = loginForm.password.value;
    loginForm.password.value = '';

    if (true) { // Replace with actual authentication logic
        const projects = await FetchProjects();
        UpdateAuth();
        renderCreateNewButton();
        renderProjects(projects);
    } else {
        alert('Incorrect password');
    }
});

const apiUrl = window.location.protocol === 'file:'
  ? 'http://localhost:8080' // Local API server during development
  : ''; // Production API

async function FetchProjects() {
  try {
      const response = await fetch(`${apiUrl}/projects`);
      return await response.json();
  } catch (error) {
      console.error('Error fetching projects:', error);
  }
}

function UpdateAuth() {
    loginForm.style.display = 'none';
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.id = 'logoutButton';
    const headerP = document.querySelector('header p');
    headerP.textContent = 'Welcome, back';
    headerP.style.marginTop = '.5rem';
    const headerNav = document.querySelector('.headerNav');
    const messagesButton = document.createElement('button');
    messagesButton.textContent = 'Messages';
    messagesButton.id = 'messagesButton';
    headerNav.appendChild(messagesButton);
    headerNav.appendChild(logoutButton);
    logoutButton.addEventListener('click', () => {
        document.querySelector('.projectList').remove();
        loginForm.style.display = 'flex';
        logoutButton.remove();
        const createNewButton = document.getElementById('createNewButton');
        if (createNewButton) createNewButton.remove();
    });
    messagesButton.addEventListener('click', async() => {
        const messages = await fetchMessages();
        renderMessages(messages);
    });
}

async function fetchMessages() {
    try {
        const response = await fetch(`${apiUrl}/messages`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function renderMessages(messages) {
    // hide the project list and display the messages list. 
    return
}

function renderCreateNewButton() {
    const createNewButton = document.createElement('button');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-plus';
    icon.style.marginRight = '.5rem';
    icon.style.fontSize = '1.5rem';
    
    createNewButton.appendChild(icon);
    const headerNav = document.querySelector('.headerNav');
    createNewButton.textContent = 'New Project';
    createNewButton.id = 'createNewButton';
    createNewButton.className = 'createNewButton';
    createNewButton.addEventListener('click', () => {
      createNewProjectModal();
    });
    headerNav.appendChild(createNewButton);
}

function renderProjects(projects) {
  const projectList = document.createElement('div');
  projectList.className = 'projectList';
  projectList.style.listStyle = 'none';

  projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'projectCard';
      card.innerHTML = `
          <div class='cardHeader'>
            <h3>${project[1]}</h3>
            <i class="fa-solid fa-trash removeButton"></i>
          </div>
          <p>${project[2]}</p>
          <button class="viewButton">View Project</button>
      `;

      const removeButton = card.querySelector('.removeButton');

            removeButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`${apiUrl}/project/${encodeURIComponent(project[0])}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log(result, ' deleted project ');
                card.remove();
            } catch (error) {
                console.error('Error deleting project:', error);
                alert(`Failed to delete project: ${error.message}`);
            }
        });

      const viewButton = card.querySelector('.viewButton');
      viewButton.addEventListener('click', () => createUpdateFunctionality(project[0]));
      
      projectList.appendChild(card);
  });

  document.body.appendChild(projectList);
}

async function createUpdateFunctionality(projectId) {
    try {
        const response = await fetch(`${apiUrl}/project/${encodeURIComponent(projectId)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const project = await response.json();
        createUpdateModal(project);
    } catch (error) {
        console.error('Error fetching project details:', error);
    }
}

function createNewProjectModal() {
    // creates a form for adding a new project
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', () => {
        overlay.remove();
        modal.remove();
    });
    const modal = document.createElement('div');
    modal.className = 'modal';
    const headerDiv = document.createElement('div');
    headerDiv.className = 'modalHeader';
    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Create New Project';
    headerDiv.appendChild(modalHeader);
    const closeBtn = document.createElement('i');
    closeBtn.className = 'fa-solid fa-xmark';
    closeBtn.addEventListener('click', () => closeModal(overlay, modal));
    modalHeader.appendChild(closeBtn);
    modal.appendChild(headerDiv);
    modalHeader.style.display = 'flex';
    modalHeader.style.flexDirection = 'row';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.paddingLeft = '1rem';
    modalHeader.style.paddingRight = '1rem';
    modalHeader.style.width = '100%';
    const form = document.createElement('form');
    form.id = 'newProjectForm';
    
    const title = document.createElement('input');
    title.type = 'text';
    title.name = 'title';
    title.required = true;
    title.placeholder = 'Project Title';
    
    const description = document.createElement('textarea');
    description.name = 'description';
    description.required = true;
    description.placeholder = 'Project Description';
    
    const requirements = document.createElement('textarea');
    requirements.name = 'requirements';
    requirements.required = true;
    requirements.placeholder = 'Requirements';
    
    const img = document.createElement('input');
    img.type = 'text';
    img.name = 'img';
    img.required = true;
    img.placeholder = 'Image URL';
    
    const results = document.createElement('textarea');
    results.name = 'results';
    results.required = true;
    results.placeholder = 'Results';
    
    const client = document.createElement('input');
    client.type = 'text';
    client.required = true;
    client.name = 'client';
    client.placeholder = 'Client';
    
    const apis = document.createElement('input');
    apis.type = 'text';
    apis.name = 'apis';
    apis.required = true;
    apis.placeholder = 'APIs';
    
    const server = document.createElement('input');
    server.type = 'text';
    server.name = 'server';
    server.required = true;
    server.placeholder = 'Server';
    
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Create Project';
    
    submit.addEventListener('click', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      console.log(data, ' form data from auth');
        
      try {
        const response = await fetch(`${apiUrl}/createproject`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: data.title,
              description: data.description,
              requirements: data.requirements,
              img: data.img,
              results: data.results,
              clientTech: data.client,
              apiTech: data.apis,  
              dbTech: data.server 
            })
        });
        const result = await response.json();
        console.log(result, ' new project ');
        closeModal(overlay, modal);
        const updatedProjects = await FetchProjects();
        document.querySelector('.projectList').remove();
        renderProjects(updatedProjects);
      } catch (error) {
        console.error('Error creating project:', error);
      }
    });
    
    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(requirements);
    form.appendChild(img);  // Added img input field
    form.appendChild(results);
    form.appendChild(client);
    form.appendChild(apis);
    form.appendChild(server);
    form.appendChild(submit);
    
    modal.appendChild(form);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

function createUpdateModal(project) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'modalHeader';

    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Update Project';
    headerDiv.appendChild(modalHeader);

    const closeBtn = document.createElement('i');
    closeBtn.className = 'fa-solid fa-xmark';
    closeBtn.addEventListener('click', () => closeModal(overlay, modal));
    headerDiv.appendChild(closeBtn);

    headerDiv.style.display = 'flex';
    headerDiv.style.width = '100%';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';

    const form = document.createElement('form');
    form.id = 'updateProjectForm';

    const name = document.createElement('input');
    name.type = 'text';
    name.name = 'name';
    name.value = project?.name;
    name.required = true;
    name.placeholder = 'Project Name';
    form.appendChild(name);

    const description = document.createElement('textarea');
    description.name = 'description';
    description.value = project?.description;
    description.required = true;
    description.placeholder = 'Project Description';
    form.appendChild(description);
    
    const requirements = document.createElement('textarea');
    requirements.name = 'requirements';
    requirements.value = project?.requirements;
    requirements.required = true;
    requirements.placeholder = 'Requirements';
    form.appendChild(requirements);

    const img = document.createElement('input');
    img.type = 'text';
    img.name = 'img';
    img.value = project?.image;
    img.required = true;
    img.placeholder = 'Image URL';
    form.appendChild(img);

    const results = document.createElement('textarea');
    results.name = 'results';
    results.value = project?.results;
    results.required = true;
    results.placeholder = 'Results';
    form.appendChild(results);
    
    const client = document.createElement('input');
    client.type = 'text';
    client.name = 'clientTech';
    client.value = project?.clientTech;
    client.required = true;
    client.placeholder = 'Client Technologies';
    form.appendChild(client);

    const apis = document.createElement('input');
    apis.type = 'text';
    apis.name = 'apiTech';
    apis.value = project?.apiTech;
    apis.required = true;
    apis.placeholder = 'API Technologies';
    form.appendChild(apis);

    const server = document.createElement('input');
    server.type = 'text';
    server.name = 'dbTech';
    server.value = project?.dbTech;
    server.required = true;
    server.placeholder = 'Database Technologies';
    form.appendChild(server);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Update Project';
    
    submit.addEventListener('click', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch(`${apiUrl}/project/${encodeURIComponent(project?.id)}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(result, ' updated project ');
            closeModal(overlay, modal);
            const updatedProjects = await FetchProjects();
            document.querySelector('.projectList').remove();
            renderProjects(updatedProjects);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    });
    
    form.appendChild(submit);
    modal.appendChild(headerDiv);
    modal.appendChild(form);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    overlay.addEventListener('click', () => closeModal(overlay, modal));
}

function closeModal(overlay, modal) {
    overlay.remove();
    modal.remove();
}