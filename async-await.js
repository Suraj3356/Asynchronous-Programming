document.getElementById('async-btn').addEventListener('click', async () => {
    const output = document.getElementById('async-output');
    output.innerText = 'Loading...';

    try {
        const data = await fetchWithTimeout('https://dummyjson.com/posts', 5000);
        const posts = data.posts.map((post) => `<p>${post.title}</p>`).join('');
        output.innerHTML = posts;
    } catch (error) {
        output.innerText = `Error: ${error}`;
    }
});

async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (signal.aborted) {
            throw 'Operation timed out';
        }
        throw error.message;
    }
}
