document.addEventListener('DOMContentLoaded', function() {
    // 1. Gestion du Panneau de Notifications
    const notificationBtn = document.getElementById('notification-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const unreadCountBadge = document.getElementById('unread-count');
    
    // Vérifie que les éléments HTML existent avant d'ajouter l'écouteur d'événement
    if (notificationBtn && notificationsPanel) {
        notificationBtn.addEventListener('click', function() {
            
            // LIGNE DE DÉBOGAGE AJOUTÉE
            console.log("Clic sur la cloche détecté ! Tentative d'affichage du panneau.");
            
            // Basculer la classe 'is-visible' pour afficher/masquer le panneau
            notificationsPanel.classList.toggle('is-visible');

            // Optionnel: Réinitialiser le compteur après l'ouverture
            if (notificationsPanel.classList.contains('is-visible')) {
                // Simuler la lecture des notifications
                unreadCountBadge.textContent = '0';
                // Assurez-vous que l'élément existe avant de changer le style (sinon erreur)
                if (unreadCountBadge) {
                    unreadCountBadge.style.backgroundColor = 'transparent';
                    unreadCountBadge.style.color = 'transparent';
                }
            } else {
                // En réalité, on rechargerait ici les notifications non lues depuis une API
            }
        });
    }

    // 2. Gestion des boutons d'action (Rappel de l'interactivité de base)
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log(`Action cliquée: ${this.textContent.trim()}`);
            // Ceci est remplacé par les liens HTML maintenant
        });
    });
});