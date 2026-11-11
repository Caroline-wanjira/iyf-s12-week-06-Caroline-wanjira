// ===== Promise versions of the functions =====
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Caroline" });
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

// ===== Exercise 1: Chain Promises =====
function exercise1() {
    console.log("--- Exercise 1: Chain Promises ---");
    return getUserData(1)
        .then(user => {
            console.log("User:", user);
            return getUserPosts(user.id);
        })
        .then(posts => {
            console.log("Posts:", posts);
            return getPostComments(posts[0].id);
        })
        .then(comments => {
            console.log("Comments:", comments);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// ===== Exercise 2: Promise.all =====
function exercise2() {
    console.log("--- Exercise 2: Promise.all ---");
    // Run multiple promises in parallel
    const promise1 = getUserData(1);
    const promise2 = getUserData(2);
    const promise3 = getUserData(3);

    return Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log("All users:", results);
        })
        .catch(error => {
            // If ANY promise fails, this runs
            console.error("One failed:", error);
        });
}

// ===== Exercise 3: Promise.race =====
function exercise3() {
    console.log("--- Exercise 3: Promise.race ---");
    // First to complete wins
    const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
    const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));

    return Promise.race([fast, slow])
        .then(result => {
            console.log("Winner:", result); // "Fast!"
        });
}

// ===== Build: Fetch 3 users at once and display them =====
function buildTask() {
    console.log("--- Build: 3 users at once ---");
    return Promise.all([getUserData(1), getUserData(2), getUserData(3)])

    .then(users => {
            users.forEach(user => {
                console.log("User " + user.id + ": " + user.name);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
// Run everything one after the other
exercise1()
    .then(exercise2)
    .then(exercise3)
    .then(buildTask);
