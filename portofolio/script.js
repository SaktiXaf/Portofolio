// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Typewriter effect
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter');
    if (!typewriterText) return;

    const text = typewriterText.textContent;
    typewriterText.textContent = '';

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < text.length) {
            typewriterText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();
}

// Sidebar functionality
function initSidebar() {
    const profileToggle = document.getElementById('profileToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    if (!profileToggle || !sidebar || !closeSidebarBtn) return;

    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('sidebar-active');
    });

    closeSidebarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.remove('sidebar-active');
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('sidebar-active') &&
            !sidebar.contains(e.target) &&
            !profileToggle.contains(e.target)) {
            sidebar.classList.remove('sidebar-active');
        }
    });

    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initSidebar();
    
    // Set initial loading state
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2000);
});

const GITHUB_CLIENT_ID = 'Ov23lispRhkTm6D0sx2V';
const GITHUB_REDIRECT_URI = window.location.origin + '/portofolio/callback.php';

// Initialize state
let accessToken = localStorage.getItem('github_token');

// Handle initial loading state
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Logic
    const profileToggle = document.getElementById('profileToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    if (profileToggle && sidebar && closeSidebarBtn) {
        profileToggle.addEventListener('click', () => {
            sidebar.classList.add('sidebar-active');
        });

        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !profileToggle.contains(e.target) && sidebar.classList.contains('sidebar-active')) {
                sidebar.classList.remove('sidebar-active');
            }
        });
    }

    const loadingOverlay = document.getElementById('loading-overlay');
    const projectsGrid = document.getElementById('projects-grid');
    
    // Hide loading overlay immediately
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
    
    // Check login status and initialize UI
    const githubLogin = document.getElementById('github-login');
    const profileInfo = document.getElementById('profile-info');
    
    if (accessToken) {
        if (githubLogin) githubLogin.style.display = 'none';
        if (profileInfo) profileInfo.style.display = 'block';
        fetchGitHubProfile();
    } else {
        if (githubLogin) githubLogin.style.display = 'block';
        if (profileInfo) profileInfo.style.display = 'none';
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p class="no-repos">Please login with GitHub to see repositories</p>';
        }
        }
    }
);
function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

function handleGitHubLogin() {
    showLoading();
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=read:user,user:email`;
    console.log('Redirect URI:', GITHUB_REDIRECT_URI);
    window.location.href = githubAuthUrl;
}
async function fetchGitHubProfile() {
    if (!accessToken) {
        return;
    }

    try {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        // Fetch user repositories
        const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });

        if (!reposResponse.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        displayRepositories(repos);
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        localStorage.setItem('github_user', JSON.stringify(data));
        updateUIWithUserData(data);
        hideLoading();
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        hideLoading();
        localStorage.removeItem('github_token');
        localStorage.removeItem('github_user');
        return false;
    }
}
function updateUIWithUserData(data) {
    const profileToggle = document.getElementById('profileToggle');
    const sidebarProfileImage = document.getElementById('sidebarProfileImage');
    const githubLogin = document.getElementById('github-login');
    const profileInfo = document.getElementById('profile-info');
    
    // Update profile images
    if (data.avatar_url) {
        if (profileToggle) profileToggle.style.backgroundImage = `url(${data.avatar_url})`;
        if (sidebarProfileImage) sidebarProfileImage.src = data.avatar_url;
    }
    
    // Toggle visibility
    if (githubLogin && profileInfo) {
        githubLogin.style.display = 'none';
        profileInfo.style.display = 'block';
    }

    // Update profile information
    const nameElement = document.querySelector('.profile-name');
    if (nameElement) nameElement.textContent = data.name || data.login;
    
    const bioElement = document.querySelector('.profile-bio');
    if (bioElement) bioElement.textContent = data.bio || 'Full Stack Developer';
    
    // Update stats
    const reposElement = document.getElementById('repos');
    if (reposElement) reposElement.textContent = data.public_repos || '0';
    
    const followersElement = document.getElementById('followers');
    if (followersElement) followersElement.textContent = data.followers || '0';
    
    const followingElement = document.getElementById('following');
    if (followingElement) followingElement.textContent = data.following || '0';
    
    // Update social links
    const githubLink = document.querySelector('.sidebar-social a[href*="github.com"]');
    if (githubLink && data.html_url) githubLink.href = data.html_url;
    
    // Show profile info with animation
    if (profileInfo) {
        profileInfo.classList.add('active');
    }
}

function displayRepositories(repos) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = ''; // Clear loading spinner

    if (!repos || repos.length === 0) {
        projectsGrid.innerHTML = '<p class="no-repos">No repositories found</p>';
        return;
    }

    repos.forEach(repo => {
        if (!repo.fork) { // Only show non-forked repositories
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const languageColor = getLanguageColor(repo.language);
            
            card.innerHTML = `
                <div class="project-header">
                    <i class="far fa-folder"></i>
                    <h3 class="project-title">${repo.name}</h3>
                </div>
                <p class="project-description">${repo.description || 'No description available'}</p>
                <div class="project-footer">
                    <div class="project-language">
                        ${repo.language ? `
                            <span class="language-color" style="background-color: ${languageColor}"></span>
                            <span>${repo.language}</span>
                        ` : ''}
                    </div>
                    <div class="project-stats">
                        <span class="project-stat">
                            <i class="far fa-star"></i>
                            ${repo.stargazers_count}
                        </span>
                        <span class="project-stat">
                            <i class="fas fa-code-branch"></i>
                            ${repo.forks_count}
                        </span>
                    </div>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn-repo">
                    <i class="fab fa-github"></i>
                    View Repository
                </a>
            `;
            
            projectsGrid.appendChild(card);
        }
    });
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'Ruby': '#701516',
        'Swift': '#ffac45',
        'Go': '#00ADD8'
    };
    return colors[language] || '#858585';
}
        if (loginButton) {
            loginButton.style.display = 'none';
        }

        githubLogin.innerHTML = `
            <div class="github-profile-summary">
                <img src="${data.avatar_url}" alt="Profile" class="github-profile-pic">
                <div class="github-profile-info">
                    <div class="github-profile-name">${data.name || data.login}</div>
                    <div class="github-profile-username">@${data.login}</div>
                    <div class="github-profile-email">${data.email || 'No public email'}</div>
                </div>
                <button id="logout-button" class="github-logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        `;

        githubLogin.style.display = 'block';
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('github_token');
                localStorage.removeItem('github_user');
                githubLogin.innerHTML = `
                    <button id="login-button" class="github-login-btn">
                        <i class="fab fa-github"></i>
                        Login with GitHub
                    </button>
                `;
                const newLoginButton = document.getElementById('login-button');
                if (newLoginButton) {
                    newLoginButton.addEventListener('click', handleGitHubLogin);
                }
                if (profileInfo) {
                    profileInfo.style.display = 'none';
                }
            });
        }
    
    document.querySelector('.profile-name').textContent = data.name || data.login;
    document.querySelector('.profile-bio').textContent = data.bio || 'GitHub User';
    document.querySelector('#repos').textContent = data.public_repos;
    document.querySelector('#followers').textContent = data.followers;
    document.querySelector('#following').textContent = data.following;
    document.querySelector('.social-icon[href*="github.com"]').href = data.html_url;
    document.getElementById('profile-info').classList.add('active');

function checkLoginStatus() {
    const loginButton = document.getElementById('github-login');
    const profileInfo = document.getElementById('profile-info');
    
    if (accessToken) {
        loginButton.style.display = 'none';
        profileInfo.style.display = 'block';
        fetchGitHubProfile();
    } else {
        loginButton.style.display = 'block';
        profileInfo.style.display = 'none';
    }
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const profileToggle = document.getElementById('profileToggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    profileToggle.addEventListener('click', () => {
        sidebar.classList.add('sidebar-active');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-active');
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-active');
        });
    });
}
function updateSidebarProfile(avatarUrl) {
    const sidebarProfileImage = document.getElementById('sidebarProfileImage');
    if (sidebarProfileImage && avatarUrl) {
        sidebarProfileImage.src = avatarUrl;
    }
}

const fadeElements = document.querySelectorAll('.project-card, .about-content, .contact-form');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    }

    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}
function openModal() {
    document.getElementById('github-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('github-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    initThemeSwitch();
    initSidebar();
    hideLoading();
    
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', handleGitHubLogin);
    }
    
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
        accessToken = storedToken;
        fetchGitHubProfile();
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('github-username').value;
            const password = document.getElementById('github-password').value;
            await handleGitHubLogin(username, password);
        });
    }
    
    checkLoginStatus();
});
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);
