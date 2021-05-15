const toggleMenu = document.querySelector('.toggle-menu');
const menu = document.querySelector('#menu');
const navLinks = document.querySelectorAll(".menu-link");

// Affiche/cache le menu et modifie l'icon ouvrir/fermer
function menuHidden () {
  const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
  toggleMenu.setAttribute('aria-expanded', !open);
  menu.hidden = !menu.hidden;
  if (toggleMenu.classList.contains('icon-menu')){
    toggleMenu.classList.replace('icon-menu', 'icon-cancel');
  }else {
    toggleMenu.classList.replace('icon-cancel', 'icon-menu');
  }
}

toggleMenu.addEventListener('click', menuHidden);

// Ferme le menu après avoir cliqué sur un lien
navLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', menuHidden);
});