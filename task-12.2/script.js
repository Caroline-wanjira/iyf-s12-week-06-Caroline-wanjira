const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
    try {
        showLoading();

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();
        displayUsers(users);

    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

// innerHTML is fine here because the data comes from an API you chose,
// not from something a visitor typed.
function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <article class="user-card">
            <h2>${user.name}</h2>
            <p><span aria-hidden="true">📧</span> ${user.email}</p>
            <p><span aria-hidden="true">🏢</span> ${user.company.name}</p>
            <p><span aria-hidden="true">📍</span> ${user.address.city}</p>
        </article>
    `).join("");
}

// Initialize
loadUsers();