// Simple Auth Logic
const CREDENTIALS = {
    username: "kashem",
    password: "HpLap#18"
};

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!isLoggedIn && !isLoginPage) {
        // Redirect to login if not logged in and not on login page
        // Handle subdirectories (e.g. skills/1.html -> ../login.html)
        if (window.location.pathname.includes('/skills/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = 'login.html';
        }
    } else if (isLoggedIn && isLoginPage) {
        // Redirect to home if already logged in and on login page
        window.location.href = 'index.html';
    }
}

function login(username, password) {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
        return true;
    } else {
        alert("Invalid credentials!");
        return false;
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Run check immediately
checkAuth();

// Expose functions globally
window.login = login;
window.logout = logout;
