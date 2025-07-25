<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portofolio Gweh</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="sidebar" class="sidebar">
        <button id="close-sidebar" class="close-sidebar">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="sidebar-profile">
            <div id="github-login" class="github-login">
                <button id="login-button" class="github-login-btn">
                    <i class="fab fa-github"></i>
                    Login with GitHub
                </button>
            </div>
            <div id="profile-info" class="profile-info" style="display: none;">
                <div class="profile-image-container">
                    <img id="sidebarProfileImage" src="profile.jpg" alt="Profile" class="sidebar-profile-image">
                </div>
                <h3 class="profile-name">SaktiXaf</h3>
                <p class="profile-bio">Full Stack Developer</p>
                
                <div class="github-stats">
                    <div class="stat-item">
                        <span id="repos">0</span>
                        <span>Repositories</span>
                    </div>
                    <div class="stat-item">
                        <span id="followers">0</span>
                        <span>Followers</span>
                    </div>
                    <div class="stat-item">
                        <span id="following">0</span>
                        <span>Following</span>
                    </div>
                </div>
                <div class="sidebar-social">
                    <a href="https://github.com/SANZXAF" target="_blank" class="social-icon">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/sakti-selginov-3b364a343/" target="_blank" class="social-icon">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="mailto:your.saktiselginov4@gmail.com" class="social-icon">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
            </div>
            
        </div>
        
        <nav class="sidebar-nav">
            <a href="#home" class="sidebar-link">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="#about" class="sidebar-link">
                <i class="fas fa-user"></i>
                <span>About</span>
            </a>
            <a href="#projects" class="sidebar-link">
                <i class="fas fa-code"></i>
                <span>Projects</span>
            </a>
            <a href="#contact" class="sidebar-link">
                <i class="fas fa-envelope"></i>
                <span>Contact</span>
            </a>
        </nav>
        <a href="#" class="sidebar-cv-btn">
            <i class="fas fa-download"></i>
            Download CV
        </a>
    </div>

    <header class="header">
        <div class="header-left">
            <div id="profileToggle" class="profile-toggle" style="background-image: url('assets/sakti.jpeg');"></div>
            <a href="#" class="logo">SANZXAF</a>
        </div>
        
        <nav class="nav-menu">
            <a href="#home" class="nav-link">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#projects" class="nav-link">Projects</a>
            <a href="#contact" class="nav-link">Contact</a>
        </nav>
    </header>
    <section id="home" class="hero">
        <div class="hero-content" style="margin: 0 auto; text-align: center;">
            <h1 class="typewriter">Hi, I'm Sakti Selginov</h1>
            <p>Full Stack Web Developer & Mid laner in Mobile Legend</p>
            <a href="#projects" class="btn">View My Work</a>
        </div>
    </section>

    <section id="about" class="about">
        <div class="about-container">
            <div class="about-image">
                <img src="assets/sakti.jpeg" alt="Profile Image" class="profile-image">
            </div>
            <div class="about-content">
                <h2>About Me</h2>
                <p>I'm a passionate Full Stack Developer with expertise in creating modern web applications. With a strong foundation in both frontend and backend technologies, I strive to build efficient, scalable, and user-friendly solutions.</p>
                
                <div class="skills-list">
                    <span class="skill-tag">HTML5</span>
                    <span class="skill-tag">CSS3</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">PHP</span>
                    <span class="skill-tag">MySQL</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">Git</span>
                </div>
            </div>
        </div>
    </section>

    <section id="projects" class="projects">
        <h2>My GitHub Projects</h2>
        <div id="projects-grid" class="projects-grid">
            <div class="loading-spinner"></div>
        </div>
    </section>
    <section id="contact" class="contact">
        <div class="contact-container">
            <h2>Get In Touch</h2>
            <form action="contact.php" method="POST" class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" class="form-textarea" required></textarea>
                </div>
                
                <button type="submit" class="btn">Send Message</button>
            </form>
        </div>
    </section>

    <footer class="footer">
        <div class="social-links">
            <a href="https://github.com/SaktiXaf" class="social-link" target="_blank">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/sakti-selginov-3b364a343/" class="social-link" target="_blank">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://wa.me/082138727564" class="social-link" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com/sakti_xaf" class="social-link" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <p>&copy; 2025 SANZXAF. All rights reserved.</p>
    </footer>

    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
