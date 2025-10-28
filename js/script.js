const icon = document.getElementById('menu-icon');
  const menu = document.getElementById('mobile-menu');

  icon.addEventListener('click', () => {
    menu.classList.toggle('show');
  });