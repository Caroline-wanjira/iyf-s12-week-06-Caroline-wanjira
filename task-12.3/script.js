const form = document.getElementById("post-form");
const message = document.getElementById("message");
const result = document.getElementById("result");

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body, userId })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.classList.add("hidden");
    result.textContent = "";

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    try {
        const newPost = await createPost(title, body, 1);

        const article = document.createElement("article");
        article.className = "result";

        const heading = document.createElement("h2");
        heading.textContent = newPost.title;

        const content = document.createElement("p");
        content.textContent = newPost.body;

        const info = document.createElement("p");
        info.textContent = "Post ID: " + newPost.id + " | User ID: " + newPost.userId;

        article.append(heading, content, info);
        result.append(article);

        form.reset();
    } catch (error) {
        message.textContent = "Error: " + error.message;
        message.classList.remove("hidden");
    }
});