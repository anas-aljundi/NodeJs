console.log('Before');
//Callback Hell
getUser(1,(user) =>
    { console.log(`id is: ${user.id} and github Name is: ${user.githubUserName}`);
      getRepositories(user.id, (repo) =>
         {console.log(`repos for user which has ID: ${repo.userId} are: ${JSON.stringify(repo.repositories)}`);
          getCommites(repo.repositories[0].repoId, (commites) => {
              console.log(`Commites for repo: ${repo.repositories[0].repoName} are: ${JSON.stringify(commites.Commites)}`);
          })})});
console.log('*********************************');
//Named Functions
getUser(1,displayUser);

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('connecting DB...');
        callback({id: 1, githubUserName: 'anas-aljundi'});
    }, 2000);
}

function getRepositories(userId, callback) {
    setTimeout(() => {
        console.log('Fetching Repositories from GitHub API...');
        callback({userId:1 , repositories: [{repoId: 1, repoName: 'Testing'}, {repoId: 2, repoName: 'Coding'}]});
    },2000);
}

function getCommites(repoId, callback) {
    setTimeout(() => {
        console.log('fething Commites From Github API...');
        callback({repoId:1, Commites: [{commiteId: 1, commiteName: 'Initial'}, {commiteId: 2, commiteName: 'Mdifications'}]});
    }, 2000);
}

function displayCommites(commites) {
    console.log(`***Commites for repo:  are: ${JSON.stringify(commites.Commites)}`);
}

function displayRepos(repo)
{
    console.log(`***repos for user which has ID: ${repo.userId} are: ${JSON.stringify(repo.repositories)}`);
    getCommites(repo.repositories[0].repoId, displayCommites)
}

function displayUser(user)
{ console.log(`***id is: ${user.id} and github Name is: ${user.githubUserName}`);
  getRepositories(user.id, displayRepos);
}