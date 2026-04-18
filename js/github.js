// ===== GITHUB STATS =====

const USERNAME = "Junseop1228";
const API_BASE = "https://api.github.com/users/" + USERNAME;

// Entry point — runs after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    fetchProfile();
    fetchRepos();
});

// Fetch and render GitHub profile
async function fetchProfile() {
    const container = document.getElementById("profile-container");

    try {
        const response = await fetch(API_BASE);

        // fetch only throws on network failure, not on 4xx/5xx
        // so we manually check response.ok
        if (!response.ok) {
            throw new Error("Failed to fetch profile: " + response.status);
        }

        const data = await response.json();
        renderProfile(container, data);

    } catch (error) {
        container.innerHTML = `<p class="error-text">Error: ${error.message}</p>`;
    }
}

// Build and inject profile card into DOM
function renderProfile(container, data) {
    // Use fallback text if value is null
    const bio = data.bio || "No bio provided.";
    const location = data.location || "Location not set.";

    container.innerHTML = `
        <div class="profile-card">
            <img src="${data.avatar_url}" alt="${data.login} avatar" class="profile-avatar">
            <div class="profile-info">
                <h3 class="profile-name">${data.name || data.login}</h3>
                <p class="profile-bio">${bio}</p>
                <p class="profile-location">📍 ${location}</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-number">${data.public_repos}</span>
                        <span class="stat-label">Repos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${data.followers}</span>
                        <span class="stat-label">Followers</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${data.following}</span>
                        <span class="stat-label">Following</span>
                    </div>
                </div>
                <a href="${data.html_url}" target="_blank" class="github-link">View on GitHub →</a>
            </div>
        </div>
    `;
}

// Fetch and render public repositories
async function fetchRepos() {
    const container = document.getElementById("repos-container");

    try {
        const response = await fetch(API_BASE + "/repos?sort=updated");

        if (!response.ok) {
            throw new Error("Failed to fetch repos: " + response.status);
        }

        const repos = await response.json();
        renderRepos(container, repos);

    } catch (error) {
        container.innerHTML = `<p class="error-text">Error: ${error.message}</p>`;
    }
}

// Build and inject repo cards into DOM
function renderRepos(container, repos) {
    // Clear loading text
    container.innerHTML = "";

    if (repos.length === 0) {
        container.innerHTML = `<p class="error-text">No public repositories found.</p>`;
        return;
    }

    // Create a card for each repo
    repos.forEach(repo => {
        const description = repo.description || "No description.";
        const language = repo.language || "N/A";

        const card = document.createElement("article");
        card.className = "repo-card";

        card.innerHTML = `
            <div class="repo-card-header">
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
            </div>
            <p class="repo-description">${description}</p>
            <div class="repo-meta">
                <span class="repo-lang">⬤ ${language}</span>
                <span class="repo-stars">★ ${repo.stargazers_count}</span>
                <span class="repo-forks">⑂ ${repo.forks_count}</span>
            </div>
        `;

        container.appendChild(card);
    });
}
