// Store data in localStorage (simulating backend)
const DB = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    exams: JSON.parse(localStorage.getItem('exams') || '[]'),
    questions: JSON.parse(localStorage.getItem('questions') || '[]'),
    
    save() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('exams', JSON.stringify(this.exams));
        localStorage.setItem('questions', JSON.stringify(this.questions));
    }
};

// Registration
document.getElementById('registration').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const user = {
        id: Date.now(),
        email: formData.get('email'),
        password: formData.get('password'),
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        dateNaissance: formData.get('dateNaissance'),
        sexe: formData.get('sexe'),
        etablissement: formData.get('etablissement'),
        filiere: formData.get('filiere'),
        userType: formData.get('userType')
    };
    
    DB.users.push(user);
    DB.save();
    alert('Inscription réussie!');
    document.getElementById('show-login').click();
});

// Login
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const user = DB.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Email ou mot de passe incorrect!');
    }
});

// Toggle forms
document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
});