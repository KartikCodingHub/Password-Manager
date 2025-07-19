// Select DOM elements
const websiteInput = document.getElementById('website');
const passwordInput = document.getElementById('password');
const addBtn = document.getElementById('add-btn');
const passwordList = document.getElementById('Password-list');

// Load saved passwords on page load
window.onload = () => {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.forEach(entry => addToDOM(entry));
};

// Add new password
addBtn.addEventListener('click', () => {
    const website = websiteInput.value.trim();
    const password = passwordInput.value.trim();

    if (!website || !password) {
        alert('Both fields are required!');
        return;
    }

    const entry = { website, password };
    saveToLocal(entry);
    addToDOM(entry);

    websiteInput.value = '';
    passwordInput.value = '';
});

// Save to local storage
function saveToLocal(entry) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push(entry);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

// Add item to the DOM
function addToDOM({ website, password }) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${website}:</strong> 
        <span class="password-text">********</span>
        <span class="actions">
            <i class="fas fa-eye visibility-toggle"></i>
            <i class="fas fa-copy copy-btn"></i>
            <i class="fas fa-edit edit-btn"></i>
            <i class="fas fa-trash delete-btn"></i>
        </span>
    `;

    // Toggle visibility
    const visibilityIcon = li.querySelector('.visibility-toggle');
    const passwordText = li.querySelector('.password-text');
    let isVisible = false;
    visibilityIcon.addEventListener('click', () => {
        isVisible = !isVisible;
        passwordText.textContent = isVisible ? password : '********';
        visibilityIcon.classList.toggle('fa-eye');
        visibilityIcon.classList.toggle('fa-eye-slash');
    });

    // Copy password
    li.querySelector('.copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(password);
        alert('Password copied!');
    });

    // Edit password
    li.querySelector('.edit-btn').addEventListener('click', () => {
        const newPass = prompt('Enter new password:', password);
        if (newPass) {
            password = newPass;
            const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            const updated = passwords.map(p => {
                return p.website === website ? { website, password: newPass } : p;
            });
            localStorage.setItem('passwords', JSON.stringify(updated));
            passwordText.textContent = isVisible ? newPass : '********';
        }
    });

    // Delete entry
    li.querySelector('.delete-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this password?')) {
            li.remove();
            const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            const updated = passwords.filter(p => p.website !== website);
            localStorage.setItem('passwords', JSON.stringify(updated));
        }
    });

    passwordList.appendChild(li);
}
