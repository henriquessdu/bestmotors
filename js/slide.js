const slides = document.querySelectorAll('.slideshow .slide');
const btnPrev = document.querySelector('.slideshow .btn-prev');
const btnNext = document.querySelector('.slideshow .btn-next');

let indiceAtual = 0;

function mostrarSlide(i) {
    if (i < 0) {
      indiceAtual = slides.length - 1;
    } else if (i >= slides.length) {
      indiceAtual = 0;
    } else {
      indiceAtual = i;
    }

    slides.forEach(slide => slide.classList.remove('ativo'));

    slides[indiceAtual].classList.add('ativo');
  }

  btnPrev.addEventListener('click', () => {
    mostrarSlide(indiceAtual - 1);
  });

  btnNext.addEventListener('click', () => {
    mostrarSlide(indiceAtual + 1);
  });

  mostrarSlide(indiceAtual);

  setInterval(() => {
  mostrarSlide(indiceAtual + 1);
}, 3000);
