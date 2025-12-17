document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments UI Globaux ---
    const loginView = document.getElementById('loginView');
    const forgotPasswordView = document.getElementById('forgotPasswordView');
    const registerView = document.getElementById('registerView');
    const views = [loginView, forgotPasswordView, registerView];

    // --- Éléments Login ---
    const clientBtn = document.getElementById('client-btn');
    const adminBtn = document.getElementById('admin-btn');
    const idLabel = document.getElementById('id-label');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('loginForm');
    const twoFactorSection = document.getElementById('twoFactorSection');
    const submitBtn = document.getElementById('submit-btn');

    let currentRole = 'client'; // Rôle par défaut

    // --- Fonction de Navigation ---
    function switchView(targetViewId) {
        views.forEach(view => {
            if (view.id === targetViewId) {
                view.classList.add('active-view');
            } else {
                view.classList.remove('active-view');
            }
        });
        // S'assurer que les rôles sont réinitialisés si on revient au login
        if (targetViewId === 'loginView') {
            switchRole('client');
        }
    }

    // --- Gestion des Clics sur les Liens de Navigation ---
    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = e.target.getAttribute('data-view');
            switchView(targetViewId);
        });
    });

    // --- Logique Login/Rôle (Inchangée) ---
    function switchRole(role) {
        currentRole = role;
        
        clientBtn.classList.remove('active');
        adminBtn.classList.remove('active');
        document.getElementById(`${role}-btn`).classList.add('active');

        if (role === 'client') {
            idLabel.textContent = 'Numéro de Compte ou Email';
            signupLink.style.display = 'inline';
        } else {
            idLabel.textContent = 'Identifiant Admin ou Email';
            signupLink.style.display = 'none'; 
        }

        twoFactorSection.style.display = 'none';
        submitBtn.textContent = 'Se Connecter';
    }

    // Écouteurs d'événements pour le sélecteur de rôle
    clientBtn.addEventListener('click', () => switchRole('client'));
    adminBtn.addEventListener('click', () => switchRole('admin'));

    // Gestion de la soumission du formulaire de Connexion (Simulation)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const twoFACodeInput = document.getElementById('2fa-code');

        if (twoFactorSection.style.display === 'none') {
            // Étape 1 : Afficher 2FA pour l'Admin ou Simuler la connexion pour le Client
            if (currentRole === 'admin') {
                console.log("Admin - Passage à l'étape 2FA.");
                twoFactorSection.style.display = 'block';
                submitBtn.textContent = 'Valider le Code 2FA';
                document.getElementById('password').value = ''; 
                twoFACodeInput.focus();
            } else {
                alert(`Connexion Client réussie ! (Simulé)`);
                loginForm.reset();
            }
        } else {
            // Étape 2 : Validation du code 2FA
            if (twoFACodeInput.value.length === 6) {
                alert(`Connexion Admin réussie avec 2FA ! (Simulé)`);
                loginForm.reset();
                switchRole(currentRole); // Réinitialiser l'interface 2FA
            } else {
                alert("Veuillez entrer un code 2FA valide (6 chiffres).");
                twoFACodeInput.focus();
            }
        }
    });

    // --- Logique Récupération de Mot de Passe (Simulation) ---
    const recoveryForm = document.getElementById('recoveryForm');
    recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const recoveryId = document.getElementById('recovery-id').value;
        alert(`Un code de réinitialisation a été envoyé à l'adresse/numéro associé à ${recoveryId}. (Simulé)`);
        recoveryForm.reset();
        switchView('loginView'); // Retour au login après envoi
    });

    // --- Logique Inscription (Simulation) ---
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regPassword = document.getElementById('reg-password').value;
        const regConfirmPassword = document.getElementById('reg-confirm-password').value;

        if (regPassword !== regConfirmPassword) {
            alert("Erreur: Les mots de passe ne correspondent pas.");
            return;
        }

        alert("Inscription Client réussie ! Vous pouvez maintenant vous connecter. (Simulé)");
        registerForm.reset();
        switchView('loginView'); // Retour au login
    });

    // Initialisation : s'assurer que le mode Client et la vue Login sont actifs au chargement
    switchRole('client');
    switchView('loginView');
});