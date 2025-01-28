document.addEventListener('DOMContentLoaded', function () {
  const projectButton = document.querySelector('.projet-btn');
  const designButton = document.querySelector('.design-btn');
  const boxDev = document.querySelector('.box-dev');
  const boxDesign = document.querySelector('.box-graph');

  function showBox(boxToShow, boxToHide) {
    boxToHide.classList.remove('fade-in'); // Retire toute animation restante
    boxToHide.style.display = 'none';

    boxToShow.style.display = 'flex';
    boxToShow.classList.add('fade-in'); // Ajoute l'animation
  }

  projectButton.addEventListener('click', function () {
    showBox(boxDev, boxDesign);
  });

  designButton.addEventListener('click', function () {
    showBox(boxDesign, boxDev);
  });
});
