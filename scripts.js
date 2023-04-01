const cornerCircles = document.querySelectorAll('.corner-circle');
const hexagon = document.querySelector('.hexagon');
const windowSizeBox = document.querySelector('.window-size-box');
const randomWordBox = document.querySelector('.random-word-box');

let previousWindowWidth = window.innerWidth;
let rotationAngle = 0;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeShapeColors(color) {
  if (!color) {
    color = getRandomColor();
  }

  cornerCircles.forEach((circle) => {
    circle.style.backgroundColor = color;
  });

  // Set the dynamic color as a CSS variable and toggle the class
  document.documentElement.style.setProperty('--dynamic-color', color);
  hexagon.classList.toggle('dynamic-color');
}

function rotateHexagon() {
  const currentWindowWidth = window.innerWidth;
  const rotationDirection = currentWindowWidth > previousWindowWidth ? 1 : -1;

  rotationAngle += rotationDirection;
  hexagon.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

  previousWindowWidth = currentWindowWidth;
}

function updateWindowSize() {
  const windowWidth = window.innerWidth.toString().padStart(4, '0');
  const windowHeight = window.innerHeight.toString().padStart(4, '0');
  windowSizeBox.textContent = `${windowWidth}px X ${windowHeight}px`;
}

async function getRandomWord() {
  try {
    const response = await fetch('words.json');
    const words = await response.json();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord.toUpperCase();
  } catch (error) {
    console.error('Error fetching random words:', error);
    return 'Error';
  }
}

window.addEventListener('resize', async () => {
  changeShapeColors();
  rotateHexagon();
  updateWindowSize();
  const randomWord = await getRandomWord();
  randomWordBox.textContent = randomWord;
});

// Initialize window size box
updateWindowSize();
changeShapeColors();
rotateHexagon();
(async () => {
  const randomWord = await getRandomWord();
  randomWordBox.textContent = randomWord;
})();
