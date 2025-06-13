const allBoxes = document.querySelectorAll('.bx');
const startButton = document.querySelector('button');
const boxesContainer = document.querySelector('.boxes');
const score = document.getElementById('score');
const dangerBoxes = new Set();
let currentscore = 0;
let gameOver = false; // ✅ Added: Flag to track if game is over

boxesContainer.style.display = 'none';

function startGame() {
  boxesContainer.style.display = 'grid';
  startButton.disabled = true;
  startButton.style.opacity = '0.5';
  startButton.style.cursor = 'not-allowed';

  gameOver = false;

  while (dangerBoxes.size < 8) {
    const randomIndex = Math.floor(Math.random() * allBoxes.length);
    dangerBoxes.add(allBoxes[randomIndex]);
  }

  console.log(dangerBoxes);
  allBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      if (gameOver || box.classList.contains('clicked')) return;
      box.classList.add('clicked');
      console.log(`Box ${index + 1} clicked`);
      if (dangerBoxes.has(box)) {
        console.log('💥 Danger box clicked!');
        box.style.backgroundColor = 'lightcoral';
        box.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        currentscore;
        score.textContent = `Score - ${currentscore}`;
        gameOver = true;

        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Continue';
        continueBtn.id = 'continueBtn';
        continueBtn.style.marginTop = '20px';
        continueBtn.style.padding = '10px 20px';
        continueBtn.style.borderRadius = '8px';
        continueBtn.style.fontSize = '16px';
        continueBtn.style.cursor = 'pointer';

        document.body.appendChild(continueBtn);

        continueBtn.addEventListener('click',()=>{
          location.reload();
        });
      } 
      else {
        console.log('✅ Safe box');
        box.style.backgroundColor = 'lightgreen';
        box.innerHTML = '<i class="fa-regular fa-gem"></i>';
        currentscore += 50;
        score.textContent = `Score - ${currentscore}`;
      }
    });
  });
}

startButton.addEventListener('click', startGame);
