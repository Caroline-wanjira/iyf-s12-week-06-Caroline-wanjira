// ===== Exercise 1: Your First Fetch =====
function exercise1() {
    console.log("--- Exercise 1: Your First Fetch ---");
    return fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
            console.log("Status:", response.status);
            console.log("OK:", response.ok);
            return response.json(); // Parse JSON
        })
        .then(data => {
            console.log("User data:", data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

// ===== Exercise 2: Fetch with Async/Await =====
async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// ===== Practice: Fetch and display =====
async function getAllUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
}

async function getUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    return response.json();
}

async function main() {
    await exercise1();

    console.log("--- Exercise 2: Async/Await ---");
    const user = await getUser(1);
    console.log(user);

    console.log("--- Practice 1: A single user ---");
    console.log(user.name, "-", user.email);

    console.log("--- Practice 2: All users ---");
    const users = await getAllUsers();
    users.forEach(u => console.log(u.id + ": " + u.name));

    console.log("--- Practice 3: Posts for user 1 ---");
    const posts = await getUserPosts(1);
    posts.forEach(p => console.log(p.id + ": " + p.title));
}

main();