const cards = document.querySelectorAll('.memory-card');
const resetBtn = document.getElementById('reset-btn');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  console.log('flipCard clicked:', this.dataset.framework, this);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const a = String(firstCard.dataset.framework).trim().toLowerCase();
  const b = String(secondCard.dataset.framework).trim().toLowerCase();
  console.log('checkForMatch ->', { a, b, firstCard, secondCard });
  const isMatch = a === b && a !== 'undefined' && a !== '';
  console.log('isMatch:', isMatch);
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// embaralhar cartas
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// garantir listeners únicos no início
cards.forEach(card => {
  card.removeEventListener('click', flipCard);
  card.addEventListener('click', flipCard);
});

resetBtn.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.remove('flip');
    // garantir que não haja listeners duplicados ao reiniciar
    card.removeEventListener('click', flipCard);
    card.addEventListener('click', flipCard);
  });
  shuffle();
  resetBoard();
});

// iniciar jogo (embaralhar)
shuffle();
