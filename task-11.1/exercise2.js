function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "Caroline", age: 26 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

function loadUser(userId, callback) {
    // Simulate 1.5 second database lookup
    setTimeout(() => {
        const user = {
            id: userId,
            name: "User " + userId,
            email: `user${userId}@example.com`
        };
        callback(user);
    }, 1500);
}

loadUser(7, function(user) {
    console.log("User loaded:", user);
});
console.log("Loading user...");