document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const searchTerm = searchInput.value.trim();
      if (searchTerm === '') {
        alert('Please enter a search term');
        return;
      }
  
      try {
        const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        const userData = await usersResponse.json();
  
        userList.innerHTML = '';
  
        if (userData.items && userData.items.length > 0) {
          userData.items.forEach((user) => {
            userList.innerHTML += `
              <li>
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
              </li>
            `;
          });
        } else {
          userList.innerHTML = '<li>No users found</li>';
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    });
  
    async function displayUserRepos(username) {
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();
  
        reposList.innerHTML = '';
  
        if (reposData.length > 0) {
          reposData.forEach((repo) => {
            reposList.innerHTML += `
              <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </li>
            `;
          });
        } else {
          reposList.innerHTML = '<li>No repositories found</li>';
        }
      } catch (error) {
        console.error('Error fetching user repos', error);
      }
    }
  });
  