document.getElementById('promise-btn').addEventListener('click', () => {
    const output = document.getElementById('promise-output');
    output.innerText = 'Loading...';

    fetchWithPromise()
        .then((data) => {
            const posts = data.posts.map((post) => `<p>${post.title}</p>`).join('');
            output.innerHTML = posts;
        })
        .catch((error) => {
            output.innerText = `Error: ${error}`;
        });
});

function fetchWithPromise() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject('Operation timed out'), 5000);

        fetch('https://dummyjson.com/posts')
            .then((response) => response.json())
            .then((data) => {
                clearTimeout(timeout);
                resolve(data);
            })
            .catch((error) => reject(error.message));
    });
}
