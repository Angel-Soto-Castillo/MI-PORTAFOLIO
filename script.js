/*
  LÓGICA DEL SCRIPT:
  Este script se encarga de toda la interactividad del portafolio.

  1. Detección del DOM Cargado:
     - `document.addEventListener('DOMContentLoaded', ...)`: Todo el código se ejecuta solo cuando la página
       HTML ha sido completamente cargada.

  2. Funcionalidad del Cambio de Tema:
     - Maneja el clic en el botón de tema, actualiza el `data-theme` del <html>, guarda la preferencia
       en `localStorage` y cambia el ícono (sol/luna).
     - Escucha cambios en las preferencias del sistema operativo y adapta el tema si no hay una
       preferencia manual del usuario.

  3. Lógica del Modal de Proyectos:
     - Escucha el evento `show.bs.modal` que se dispara justo antes de que el modal aparezca.
     - Identifica qué botón fue presionado para abrir el modal.
     - De forma dinámica, busca la imagen dentro de la tarjeta correspondiente.
     - Extrae los datos (título, descripción) de los atributos `data-*` del botón.
     - Rellena el contenido del modal (título, imagen, descripción) con la información obtenida.

  4. Funcionalidad del Navbar Responsivo:
     - Cierra automáticamente el menú desplegable (en móviles) cuando se hace clic en un enlace.
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DEL CAMBIO DE TEMA ---
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeIcon = themeToggleButton.querySelector('i');

  const updateIcon = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  };

  themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateIcon();
    }
  });

  updateIcon();

  // --- LÓGICA DEL MODAL DE PROYECTOS ---
  const projectModal = document.getElementById('projectModal');
  projectModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    
    // Lógica dinámica para encontrar la imagen
    const card = button.closest('.card');
    const cardImage = card.querySelector('.card-img-top');
    const imgSrc = cardImage.src;

    // Extraer el resto de la información
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    // Opcional: si quieres añadir un enlace real al proyecto
    const projectLink = button.getAttribute('data-link') || '#'; 

    // Actualizar el contenido del modal
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalImage = projectModal.querySelector('#modal-img');
    const modalDescription = projectModal.querySelector('#modal-description');
    const modalProjectLink = projectModal.querySelector('#modal-project-link');
    
    modalTitle.textContent = title;
    modalImage.src = imgSrc;
    modalDescription.textContent = description;
    modalProjectLink.href = projectLink;
    
    // Ocultar el botón si no hay enlace
    if (projectLink === '#') {
        modalProjectLink.style.display = 'none';
    } else {
        modalProjectLink.style.display = 'inline-block';
    }
  });


  // --- LÓGICA PARA CERRAR EL NAVBAR RESPONSIVO AL HACER CLIC ---
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  // Evita error si el navbar no existe o no tiene un collapse
  if (navbarCollapse) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }
});