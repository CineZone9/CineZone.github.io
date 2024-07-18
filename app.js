const movies = [
    { id: 1, title: "Die Natur", genre: "trailer", thumbnail: "images/natur.jpg", video: "videos/nature.mp4" },
    { id: 2, title: "the moor", genre: "doku", thumbnail: "images/moore.jpg", video: "videos/moor.mp4" },
];

function showRegister() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Register</h2>
        <input type="text" id="registerUsername" placeholder="Username"><br>
        <input type="password" id="registerPassword" placeholder="Password"><br>
        <button onclick="register()">Register</button>
    `;
}

function showLogin() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Login</h2>
        <input type="text" id="loginUsername" placeholder="Username"><br>
        <input type="password" id="loginPassword" placeholder="Password"><br>
        <button onclick="login()">Login</button>
    `;
}

function showMovies() {
    const content = document.getElementById('content');
    let movieList = "<h2>Available Movies</h2><div class='movies'>";
    movies.forEach(movie => {
        movieList += `
            <div class="movie">
                <img src="${movie.thumbnail}" alt="${movie.title}" onclick="watchMovie(${movie.id})">
                <p>${movie.title} (${movie.genre})</p>
            </div>`;
    });
    movieList += "</div>";
    content.innerHTML = movieList;
}

function watchMovie(id) {
    const movie = movies.find(m => m.id === id);
    if (movie) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div id="videoPlayer">
                <div class="video-container">
                    <video controls>
                        <source src="${movie.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <button onclick="showMovies()">Back to Movies</button>
        `;
    } else {
        alert("Movie not found.");
    }
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert("Username already taken. Try another one.");
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful!");
        showLogin();
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
        alert("Username not found.");
    } else if (users[username] !== password) {
        alert("Incorrect password.");
    } else {
        sessionStorage.setItem('user', username);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('userActions').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}`;
        alert("Login successful!");
        showMovies();
    }
}

function logout() {
    sessionStorage.removeItem('user');
    document.getElementById('auth').style.display = 'block';
    document.getElementById('userActions').style.display = 'none';
    document.getElementById('content').innerHTML = '';
    alert("Logout successful!");
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('user')) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('userActions').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = `Welcome, ${sessionStorage.getItem('user')}`;
        showMovies();
    }
});
