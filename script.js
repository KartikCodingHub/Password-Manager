let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

function saveToLocalStorage() {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}

function renderPasswords() {
  const list = document.getElementById("passwordList");
  list.innerHTML = "";
  passwords.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "bg-white bg-opacity-80 border border-gray-300 p-4 rounded-lg flex justify-between items-center shadow-md animate-fade-slide";
    div.innerHTML = `
      <div>
        <p class="text-gray-700 font-medium">${entry.website}</p>
        <p id="pass-${index}" class="text-gray-500 tracking-widest">********</p>
      </div>
      <div class="flex space-x-2 text-lg text-gray-600">
      <!-- View/Hide -->
      <button onclick="togglePassword(${index})" title="View/Hide" class="hover:text-blue-600 transition">🕶️</button>
      <!-- Copy --><button onclick="copyPassword(${index})" title="Copy" class="hover:text-green-600 transition">📎</button>
      <!-- Edit --><button onclick="editPassword(${index})" title="Edit" class="hover:text-yellow-600 transition">🛠️</button>
      <!-- Delete --><button onclick="deletePassword(${index})" title="Delete" class="hover:text-red-600 transition">🧨</button>
      </div>

    `;
    list.appendChild(div);
  });
}

function addPassword() {
  const website = document.getElementById("website").value.trim();
  const password = document.getElementById("password").value.trim();
  if (website && password) {
    passwords.push({ website, password });
    saveToLocalStorage();
    renderPasswords();
    document.getElementById("website").value = "";
    document.getElementById("password").value = "";
  }
}

function togglePassword(index) {
  const span = document.getElementById(`pass-${index}`);
  if (span.textContent === "********") {
    span.textContent = passwords[index].password;
  } else {
    span.textContent = "********";
  }
}

function copyPassword(index) {
  const tempInput = document.createElement("input");
  tempInput.value = passwords[index].password;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("🔒 Password copied to clipboard!");
}

function editPassword(index) {
  const newPass = prompt("Enter new password:");
  if (newPass) {
    passwords[index].password = newPass;
    saveToLocalStorage();
    renderPasswords();
  }
}

function deletePassword(index) {
  if (confirm("Do you really want to delete this password?")) {
    passwords.splice(index, 1);
    saveToLocalStorage();
    renderPasswords();
  }
}

renderPasswords();
