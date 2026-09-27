(function() {
    const REDIRECT_URL = "https://grisha-main.vercel.app";

    // ---- If a session is already saved, skip straight to the main app ----
    if (localStorage.getItem('grishaUser')) {
        window.location.href = REDIRECT_URL;
        return;
    }

    // ---- Toggle between login / register panels ----
    document.getElementById('showLoginBtn').onclick = () => {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('registerForm').classList.remove('active');
        document.getElementById('showLoginBtn').classList.add('active');
        document.getElementById('showRegisterBtn').classList.remove('active');
    };
    document.getElementById('showRegisterBtn').onclick = () => {
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('showRegisterBtn').classList.add('active');
        document.getElementById('showLoginBtn').classList.remove('active');
    };

    // ---- Register ----
    document.getElementById('submitRegisterBtn').onclick = () => {
        const errEl = document.getElementById('registerError');
        errEl.textContent = '';
        const name = document.getElementById('regUsername').value.trim();
        const pass = document.getElementById('regPassword').value.trim();
        if (!name || !pass) { errEl.textContent = 'Отсутствует логин или пароль.'; return; }
        const users = JSON.parse(localStorage.getItem('grishaUsers') || '{}');
        if (users[name]) { errEl.textContent = 'Аккаунт с таким именем уже существует.'; return; }
        users[name] = pass;
        localStorage.setItem('grishaUsers', JSON.stringify(users));

        const profile = { name, balance: 0, purchasedItems: ['default'], activeTheme: 'default', completedLessons: {}, usedPromoCodes: [] };
        localStorage.setItem('grishaUser', JSON.stringify(profile));
        localStorage.setItem('grishaCoins', '0');
        localStorage.setItem('grishaPurchasedItems', JSON.stringify(['default']));
        localStorage.setItem('grishaActiveTheme', 'default');

        window.location.href = REDIRECT_URL;
    };

    // ---- Login ----
    document.getElementById('submitLoginBtn').onclick = () => {
        const errEl = document.getElementById('loginError');
        errEl.textContent = '';
        const name = document.getElementById('loginUsername').value.trim();
        const pass = document.getElementById('loginPassword').value.trim();
        const users = JSON.parse(localStorage.getItem('grishaUsers') || '{}');
        if (!users[name] || users[name] !== pass) { errEl.textContent = 'Неправильное имя или пароль.'; return; }

        const saved = localStorage.getItem('grishaUser');
        let profile;
        if (saved && JSON.parse(saved).name === name) {
            profile = JSON.parse(saved);
        } else {
            profile = { name, balance: 0, purchasedItems: ['default'], activeTheme: 'default', completedLessons: {}, usedPromoCodes: [] };
        }
        localStorage.setItem('grishaUser', JSON.stringify(profile));
        localStorage.setItem('grishaCoins', String(profile.balance || 0));
        localStorage.setItem('grishaPurchasedItems', JSON.stringify(profile.purchasedItems || ['default']));
        localStorage.setItem('grishaActiveTheme', profile.activeTheme || 'default');

        window.location.href = REDIRECT_URL;
    };
})();
