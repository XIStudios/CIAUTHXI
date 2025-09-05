document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.createElement('div');
  dialog.id = 'authDialog';
  dialog.innerHTML = `
    <div class="dialog-content">
      <h2 id="dialogTitle">Login</h2>
      <form id="authForm">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <div class="msg" id="authMsg"></div>
      </form>
      <p>
        <span id="toggleText">Don't have an account?</span>
        <button id="toggleBtn" type="button">Sign Up</button>
      </p>
    </div>
  `;
  document.body.appendChild(dialog);

  let isLogin = true;
  const dialogTitle = document.getElementById('dialogTitle');
  const authForm = document.getElementById('authForm');
  const authMsg = document.getElementById('authMsg');
  const toggleBtn = document.getElementById('toggleBtn');
  const toggleText = document.getElementById('toggleText');

  toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    dialogTitle.textContent = isLogin ? 'Login' : 'Sign Up';
    toggleBtn.textContent = isLogin ? 'Sign Up' : 'Login';
    toggleText.textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
    authForm.querySelector('button[type="submit"]').textContent = isLogin ? 'Login' : 'Sign Up';
    authMsg.textContent = '';
  });

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (isLogin) {
      authMsg.textContent = data.token ? 'Login successful!' : (data.error || 'Login failed');
    } else {
      authMsg.textContent = data.message || data.error;
    }
  });
});
