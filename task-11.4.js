// ===== Promise versions of the functions =====
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "caroline" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

//  Exercise 1

// Promise chain version:
function getDataWithPromises() {
    return getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => comments);
}

// Async/await version (much cleaner!):
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

//  Exercise 2
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error; // Re-throw if needed
    }
}

//  Exercise 3
async function getAllUsers() {
    // Sequential (slow):
    console.time("Sequential");
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    console.timeEnd("Sequential"); // ~3 seconds

    // Parallel (fast):
    console.time("Parallel");
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    console.timeEnd("Parallel"); // ~1 second

    return [u1, u2, u3];
}

// ===== Build: Callback hell rewritten with async/await =====
async function buildTask() {
    const user = await getUserData(1);
    console.log("User:", user);

    const posts = await getUserPosts(user.id);
    console.log("Posts:", posts);

    const comments = await getPostComments(posts[0].id);
    console.log("Comments:", comments);
}

// ===== Run everything one after the other =====
async function main() {
    console.log("--- Exercise 1: Async/Await ---");
    const comments = await getDataWithAsync();
    console.log(comments);

    console.log("--- Exercise 2: Try/Catch ---");
    const result = await fetchUserData(1);
    console.log("Result:", result);

    try {
        await fetchUserData(-1); // this one fails on purpose
    } catch (error) {
        console.log("Caught the error:", error);
    }

    console.log("--- Exercise 3: Parallel ---");
    const users = await getAllUsers();
    console.log("All users:", users);

    console.log("--- Build: Callback hell with async/await ---");
    await buildTask();
}

main();