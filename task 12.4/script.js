const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const citySelect = document.getElementById("city");
const count = document.getElementById("count");

let allUsers = [];

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}

function populateCities(users) {
    const cities = [...new Set(users.map(user => user.address.city))].sort();

    citySelect.innerHTML = '<option value="">All cities</option>' +
        cities.map(city => `<option value="${city}">${city}</option>`).join("");
}

// One function applies search, city filter and sort together
function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const city = citySelect.value;
    const order = sortSelect.value;

    const result = allUsers
        .filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        )
        .filter(user => city === "" || user.address.city === city)
        .sort((a, b) =>
            order === "za"
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name)
        );

    displayUsers(result);
}

function displayUsers(users) {
    count.textContent = `Showing ${users.length} of ${allUsers.length} users`;

    if (users.length === 0) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    container.innerHTML = users.map(user => `
        <article class="user-card">
            <h2>${user.name}</h2>
            <p><span aria-hidden="true">📧</span> ${user.email}</p>
            <p><span aria-hidden="true">🏢</span> ${user.company.name}</p>
            <p><span aria-hidden="true">📍</span> ${user.address.city}</p>
        </article>
    `).join("");
}

async function init() {
    try {
        allUsers = await fetchUsers();
        populateCities(allUsers);
        applyFilters();

        // Set up search, sort and city filter
        searchInput.addEventListener("input", applyFilters);
        sortSelect.addEventListener("change", applyFilters);
        citySelect.addEventListener("change", applyFilters);
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

init();