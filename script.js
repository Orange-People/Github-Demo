// GitHub Deep Dive - Interactive Demo
class GitHubDemo {
    constructor() {
        this.currentTab = 'commits';
        this.commits = [];
        this.branches = [];
        this.issues = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateCounters();
        this.generateSampleData();
        this.setupScrollAnimations();
        this.updateDemoContent();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveNavLink(link);
            });
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    animateCounters() {
        const counters = [
            { id: 'repos-count', target: 1250, duration: 2000 },
            { id: 'commits-count', target: 15600, duration: 2500 },
            { id: 'collaborators-count', target: 45, duration: 1500 }
        ];

        counters.forEach(counter => {
            this.animateCounter(counter.id, counter.target, counter.duration);
        });
    }

    animateCounter(elementId, target, duration) {
        const element = document.getElementById(elementId);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    generateSampleData() {
        // Generate sample commits
        this.commits = [
            {
                id: 'a1b2c3d',
                message: 'Add user authentication system',
                author: 'john.doe',
                date: '2 hours ago',
                files: '+15 -3',
                type: 'feature'
            },
            {
                id: 'e4f5g6h',
                message: 'Fix responsive design issues',
                author: 'jane.smith',
                date: '4 hours ago',
                files: '+8 -12',
                type: 'fix'
            },
            {
                id: 'i7j8k9l',
                message: 'Update documentation',
                author: 'mike.wilson',
                date: '1 day ago',
                files: '+25 -5',
                type: 'docs'
            },
            {
                id: 'm1n2o3p',
                message: 'Refactor API endpoints',
                author: 'sarah.jones',
                date: '2 days ago',
                files: '+45 -20',
                type: 'refactor'
            },
            {
                id: 'q4r5s6t',
                message: 'Add unit tests for user service',
                author: 'alex.brown',
                date: '3 days ago',
                files: '+120 -0',
                type: 'test'
            }
        ];

        // Generate sample branches
        this.branches = [
            {
                name: 'main',
                lastCommit: 'a1b2c3d',
                author: 'john.doe',
                date: '2 hours ago',
                protected: true,
                ahead: 0,
                behind: 0
            },
            {
                name: 'feature/user-dashboard',
                lastCommit: 'x9y8z7w',
                author: 'jane.smith',
                date: '1 hour ago',
                protected: false,
                ahead: 3,
                behind: 1
            },
            {
                name: 'bugfix/login-validation',
                lastCommit: 'v6u5t4r',
                author: 'mike.wilson',
                date: '3 hours ago',
                protected: false,
                ahead: 2,
                behind: 0
            },
            {
                name: 'feature/payment-integration',
                lastCommit: 's3p2o1n',
                author: 'sarah.jones',
                date: '1 day ago',
                protected: false,
                ahead: 8,
                behind: 2
            },
            {
                name: 'hotfix/security-patch',
                lastCommit: 'm9l8k7j',
                author: 'alex.brown',
                date: '5 hours ago',
                protected: false,
                ahead: 1,
                behind: 0
            }
        ];

        // Generate sample issues
        this.issues = [
            {
                number: 123,
                title: 'Fix login button styling on mobile devices',
                author: 'jane.smith',
                date: '2 days ago',
                labels: ['bug', 'mobile', 'ui'],
                status: 'open',
                assignee: 'mike.wilson'
            },
            {
                number: 124,
                title: 'Add dark mode support',
                author: 'alex.brown',
                date: '1 week ago',
                labels: ['enhancement', 'ui', 'feature'],
                status: 'open',
                assignee: 'sarah.jones'
            },
            {
                number: 125,
                title: 'Implement user profile picture upload',
                author: 'john.doe',
                date: '3 days ago',
                labels: ['feature', 'backend'],
                status: 'in-progress',
                assignee: 'john.doe'
            },
            {
                number: 126,
                title: 'Optimize database queries for user search',
                author: 'mike.wilson',
                date: '5 days ago',
                labels: ['performance', 'database'],
                status: 'closed',
                assignee: 'mike.wilson'
            },
            {
                number: 127,
                title: 'Add email notifications for new messages',
                author: 'sarah.jones',
                date: '1 week ago',
                labels: ['feature', 'notifications'],
                status: 'open',
                assignee: null
            }
        ];
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
        this.updateDemoContent();
    }

    updateDemoContent() {
        if (this.currentTab === 'commits') {
            this.renderCommits();
        } else if (this.currentTab === 'branches') {
            this.renderBranches();
        } else if (this.currentTab === 'issues') {
            this.renderIssues();
        }
    }

    renderCommits() {
        const container = document.getElementById('commit-list');
        container.innerHTML = '';

        this.commits.forEach(commit => {
            const commitElement = document.createElement('div');
            commitElement.className = 'commit-item';
            commitElement.innerHTML = `
                <div class="commit-header">
                    <div class="commit-id">${commit.id}</div>
                    <div class="commit-type ${commit.type}">${commit.type}</div>
                </div>
                <div class="commit-message">${commit.message}</div>
                <div class="commit-meta">
                    <span class="commit-author">${commit.author}</span>
                    <span class="commit-date">${commit.date}</span>
                    <span class="commit-files">${commit.files} files</span>
                </div>
            `;
            container.appendChild(commitElement);
        });
    }

    renderBranches() {
        const container = document.getElementById('branch-list');
        container.innerHTML = '';

        this.branches.forEach(branch => {
            const branchElement = document.createElement('div');
            branchElement.className = 'branch-item';
            branchElement.innerHTML = `
                <div class="branch-header">
                    <div class="branch-name">
                        <i class="fas fa-code-branch"></i>
                        ${branch.name}
                        ${branch.protected ? '<i class="fas fa-shield-alt protected"></i>' : ''}
                    </div>
                    <div class="branch-stats">
                        ${branch.ahead > 0 ? `<span class="ahead">+${branch.ahead}</span>` : ''}
                        ${branch.behind > 0 ? `<span class="behind">-${branch.behind}</span>` : ''}
                    </div>
                </div>
                <div class="branch-meta">
                    <span class="branch-commit">${branch.lastCommit}</span>
                    <span class="branch-author">${branch.author}</span>
                    <span class="branch-date">${branch.date}</span>
                </div>
            `;
            container.appendChild(branchElement);
        });
    }

    renderIssues() {
        const container = document.getElementById('issue-list');
        container.innerHTML = '';

        this.issues.forEach(issue => {
            const issueElement = document.createElement('div');
            issueElement.className = `issue-item ${issue.status}`;
            issueElement.innerHTML = `
                <div class="issue-header">
                    <div class="issue-number">#${issue.number}</div>
                    <div class="issue-status ${issue.status}">${issue.status}</div>
                </div>
                <div class="issue-title">${issue.title}</div>
                <div class="issue-meta">
                    <span class="issue-author">${issue.author}</span>
                    <span class="issue-date">${issue.date}</span>
                    ${issue.assignee ? `<span class="issue-assignee">@${issue.assignee}</span>` : ''}
                </div>
                <div class="issue-labels">
                    ${issue.labels.map(label => `<span class="issue-label ${label}">${label}</span>`).join('')}
                </div>
            `;
            container.appendChild(issueElement);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Additional utility functions
class GitHubUtils {
    static formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
    }

    static generateCommitHash() {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < 7; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static simulateGitCommand(command) {
        console.log(`$ ${command}`);
        // Simulate command execution with realistic output
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Command executed: ${command}`);
            }, 1000);
        });
    }
}

// Interactive Git Commands Demo
class GitCommandsDemo {
    constructor() {
        this.setupCommandDemo();
    }

    setupCommandDemo() {
        // Add click handlers to command examples
        document.querySelectorAll('.command-item code').forEach(codeElement => {
            codeElement.style.cursor = 'pointer';
            codeElement.addEventListener('click', (e) => {
                this.executeCommand(e.target.textContent);
            });
        });
    }

    async executeCommand(command) {
        const terminal = this.createTerminal();
        document.body.appendChild(terminal);
        
        // Show typing animation
        await this.typeCommand(terminal, command);
        
        // Show command output
        await this.showCommandOutput(terminal, command);
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            terminal.remove();
        }, 3000);
    }

    createTerminal() {
        const terminal = document.createElement('div');
        terminal.className = 'git-terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <span class="control close"></span>
                    <span class="control minimize"></span>
                    <span class="control maximize"></span>
                </div>
                <div class="terminal-title">Git Terminal</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-content"></div>
            </div>
        `;
        return terminal;
    }

    async typeCommand(terminal, command) {
        const content = terminal.querySelector('.terminal-content');
        const prompt = '$ ';
        content.textContent = prompt;
        
        for (let i = 0; i < command.length; i++) {
            content.textContent += command[i];
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    async showCommandOutput(terminal, command) {
        const content = terminal.querySelector('.terminal-content');
        content.innerHTML += '<br>';
        
        // Simulate command execution
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const output = this.getCommandOutput(command);
        content.innerHTML += output;
    }

    getCommandOutput(command) {
        const outputs = {
            'git init': 'Initialized empty Git repository in /path/to/project/.git/',
            'git status': 'On branch main<br>No commits yet<br><br>nothing to commit (create/copy files and use "git add" to track)',
            'git add .': '',
            'git commit -m "message"': '1 file changed, 1 insertion(+)<br>create mode 100644 index.html',
            'git branch': '* main',
            'git log': 'commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6<br>Author: John Doe &lt;john@example.com&gt;<br>Date: Mon Jan 1 12:00:00 2024 +0000<br><br>    Initial commit'
        };
        
        return outputs[command] || 'Command executed successfully';
    }
}

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubDemo();
    new GitCommandsDemo();
    
    // Add some dynamic interactions
    addDynamicInteractions();
});

function addDynamicInteractions() {
    // Add hover effects to cards
    document.querySelectorAll('.content-card, .feature-item, .practice-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.tab-btn, .nav-link').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Simulate real-time updates
    setInterval(() => {
        updateLiveStats();
    }, 5000);
}

function updateLiveStats() {
    // Simulate live updates to commit count
    const commitsCount = document.getElementById('commits-count');
    if (commitsCount) {
        const current = parseInt(commitsCount.textContent.replace(/,/g, ''));
        const newCount = current + Math.floor(Math.random() * 3);
        commitsCount.textContent = newCount.toLocaleString();
    }
}

// Add CSS for terminal and additional styles
const additionalStyles = `
.git-terminal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90vw;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 1000;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.terminal-header {
    background: #2d2d2d;
    padding: 10px 15px;
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.terminal-controls {
    display: flex;
    gap: 8px;
}

.control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.control.close { background: #ff5f57; }
.control.minimize { background: #ffbd2e; }
.control.maximize { background: #28ca42; }

.terminal-title {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
}

.terminal-body {
    padding: 15px;
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
}

.commit-item, .branch-item, .issue-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.commit-item:hover, .branch-item:hover, .issue-item:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-1px);
}

.commit-header, .branch-header, .issue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.commit-id, .branch-name, .issue-number {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-weight: 600;
    color: #667eea;
}

.commit-type {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.commit-type.feature { background: #c6f6d5; color: #22543d; }
.commit-type.fix { background: #fed7d7; color: #c53030; }
.commit-type.docs { background: #bee3f8; color: #2b6cb0; }
.commit-type.refactor { background: #fef5e7; color: #744210; }
.commit-type.test { background: #e9d8fd; color: #553c9a; }

.commit-message, .issue-title {
    font-weight: 500;
    color: #2d3748;
    margin-bottom: 8px;
}

.commit-meta, .branch-meta, .issue-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
    color: #666;
}

.branch-stats {
    display: flex;
    gap: 8px;
}

.ahead, .behind {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
}

.ahead {
    background: #c6f6d5;
    color: #22543d;
}

.behind {
    background: #fed7d7;
    color: #c53030;
}

.protected {
    color: #f6ad55;
    margin-left: 5px;
}

.issue-status {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.issue-status.open { background: #c6f6d5; color: #22543d; }
.issue-status.in-progress { background: #bee3f8; color: #2b6cb0; }
.issue-status.closed { background: #e2e8f0; color: #4a5568; }

.issue-labels {
    display: flex;
    gap: 5px;
    margin-top: 8px;
    flex-wrap: wrap;
}

.issue-label {
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
}

.issue-label.bug { background: #fed7d7; color: #c53030; }
.issue-label.enhancement { background: #bee3f8; color: #2b6cb0; }
.issue-label.feature { background: #c6f6d5; color: #22543d; }
.issue-label.mobile { background: #e9d8fd; color: #553c9a; }
.issue-label.ui { background: #fef5e7; color: #744210; }
.issue-label.backend { background: #f7fafc; color: #4a5568; }
.issue-label.performance { background: #fed7d7; color: #c53030; }
.issue-label.database { background: #bee3f8; color: #2b6cb0; }
.issue-label.notifications { background: #c6f6d5; color: #22543d; }

.issue-assignee {
    color: #667eea;
    font-weight: 500;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
