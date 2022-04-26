// create a function to search github
// takes in a parameter for the search request

function getUser(userName) {
  fetch(`https://api.github.com/search/users?q=${userName}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const userList = data.items;
      const userListContainer = document.getElementById('user-list');
      console.log(userList);
      userList.forEach(user => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const link = document.createElement('a');
        const p = document.createElement('p');
        link.href = user['html_url'];
        link.textContent = 'Profile';
        img.src = user['avatar_url'];
        p.innerHTML = user.login;
        p.id = user.id;
        p.className = 'user';
        li.append(p, img, link);
        userListContainer.append(li);
      })
      clickUser();
    })
}

function searchForUser() {
  const searchForm = document.getElementById('github-form');
  const submitBtn = searchForm.childNodes[3];
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchRequest = e.target.parentNode[0].value;
    getUser(searchRequest);
    searchForm.reset();
  })
}

function getRepo(user) {
  fetch(`https://api.github.com/users/${user}/repos`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const repoList = document.getElementById('repos-list');
    data.forEach(repo => {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.innerHTML = repo.name;
      li.append(p);
      repoList.append(li);
    })
    
  })
}

function clickUser() {
  const users = document.getElementsByClassName('user');
  // console.log(users);
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    console.log(user);
    user.addEventListener('click', (e) => {
      console.log(typeof user.textContent);
      getRepo(user.textContent);
    })
  }
}

function getRepository(repo) {
  fetch(`https://api.github.com/search/repositories?q=${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const repoList = document.getElementById('repos-list');
    const repos = data.items;
    console.log(repos);
    repos.forEach(repo => {
      const li = document.createElement('li');
      const p = document.createElement('p');

      p.innerHTML = repo.name;
      li.append(p);
      repoList.append(li);
    })
  })
}

function searchRepos() {
  const form = document.getElementById('github-form');
  const searchBtn = form.childNodes[5];
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let repo = e.target.parentNode[0].value;
    getRepository(repo);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  searchForUser();
  searchRepos();
})







// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.

// Toggle the search bar between searching for users by keyword and searching for repos by keyword by adding an extra button. Hint: you can use the same search bar for this, but you may need to create a variable which stores what the current search type is (user or repo). The endpoint to search repositories by keyword is here (Links to an external site.).
