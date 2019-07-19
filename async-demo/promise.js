
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`promise is here...${id}`);
            resolve({id:1, Name: 'Anas-aljundi'});
        }, 2000);
    })
}

function getRepositories(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Repositories are here...${userId}`);
            resolve({userId:1, repos: [{repoId: 1, repoName: 'NodeJs'}, {repoId:2, repoName: 'Angular'}]});
        }, 2000);
    });
}

getUser(1).then(user => getRepositories(user.id)).then(result => console.log(JSON.stringify(result)));
getRepositories(1).then(result => console.log(JSON.stringify(result)));

const p = Promise.reject(new Error('Error Error...'));
p.catch(err => console.log(`error is ${err}`));

async function displayUser() {
    const user = await getUser(1);
    return user;
}
const u = displayUser();
console.log(u);