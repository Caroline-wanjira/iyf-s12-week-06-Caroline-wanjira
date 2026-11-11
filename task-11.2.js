// Exercise 1
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");

// ===== Predict the output =====
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// ===== Exercise 2: Callback Pattern =====
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