document.getElementById('callback-btn').addEventListener('click', () => {
    simulateDelay(5000, () => {
        document.getElementById('callback-output').innerText = 'Callback executed after 5 seconds';
    });
});

function simulateDelay(delay, callback) {
    setTimeout(callback, delay);
}
document.getElementById('callback-btn').addEventListener('click', () => {
    simulateDelay(5000, fetchData);
});

function fetchData() {
    fetch('https://dummyjson.com/posts')
        .then((response) => response.json())
        .then((data) => {
            const output = data.posts.map((post) => `<p>${post.title}</p>`).join('');
            document.getElementById('callback-output').innerHTML = output;
        })
        .catch((error) => {
            document.getElementById('callback-output').innerText = `Error: ${error.message}`;
        });
}
