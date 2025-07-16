const animals = [
    { name: 'Cat', image: 'assets/cat.png' },
    { name: 'Dog', image: 'assets/dog.png' },
    { name: 'Bear', image: 'assets/bear.png' },
    { name: 'Lion', image: 'assets/lion.png' },
    { name: 'Tiger', image: 'assets/tiger.png' },
    { name: 'Penguin', image: 'assets/penguin.png' },
    { name: 'Monkey', image: 'assets/monkey.png' },
    { name: 'Zebra', image: 'assets/zebra.png' },
    { name: 'Hippo', image: 'assets/hippo.png' },
    { name: 'Frog', image: 'assets/frog.png' },
    { name: 'Panda', image: 'assets/panda.png' },
    { name: 'Koala', image: 'assets/koala.png' },
    { name: 'Kangaroo', image: 'assets/kangaroo.png' },
    { name: 'Owl', image: 'assets/owl.png' },
    { name: 'Fox', image: 'assets/fox.png' },
    { name: 'Wolf', image: 'assets/wolf.png' },
    { name: 'Deer', image: 'assets/deer.png' },
    { name: 'Squirrel', image: 'assets/squirrel.png' },
    { name: 'Rabbit', image: 'assets/rabbit.png' },
    { name: 'Turtle', image: 'assets/turtle.png' },
    { name: 'Snake', image: 'assets/snake.png' },
    { name: 'Crocodile', image: 'assets/crocodile.png' },
    { name: 'Whale', image: 'assets/whale.png' },
    { name: 'Dolphin', image: 'assets/dolphin.png' },
    { name: 'Shark', image: 'assets/shark.png' },
    { name: 'Octopus', image: 'assets/octopus.png' },
    { name: 'Crab', image: 'assets/crab.png' },
    { name: 'Fish', image: 'assets/fish.png' },
    { name: 'Horse', image: 'assets/horse.png' },
    { name: 'Cow', image: 'assets/cow.png' },
    { name: 'Pig', image: 'assets/pig.png' },
    { name: 'Sheep', image: 'assets/sheep.png' },
    { name: 'Chicken', image: 'assets/chicken.png' },
    { name: 'Duck', image: 'assets/duck.png' },
    { name: 'Goat', image: 'assets/goat.png' },
    { name: 'Rooster', image: 'assets/rooster.png' },
    { name: 'Turkey', image: 'assets/turkey.png' },
    { name: 'Butterfly', image: 'assets/butterfly.png' },
    { name: 'Bee', image: 'assets/bee.png' },
    { name: 'Ladybug', image: 'assets/ladybug.png' },
    { name: 'Ant', image: 'assets/ant.png' },
    { name: 'Spider', image: 'assets/spider.png' },
    { name: 'Bat', image: 'assets/bat.png' },
    { name: 'Eagle', image: 'assets/eagle.png' },
    { name: 'Parrot', image: 'assets/parrot.png' },
    { name: 'Flamingo', image: 'assets/flamingo.png' },
    { name: 'Peacock', image: 'assets/peacock.png' },
    { name: 'Swan', image: 'assets/swan.png' },
    { name: 'Hedgehog', image: 'assets/hedgehog.png' },
    { name: 'Raccoon', image: 'assets/raccoon.png' },
    { name: 'Skunk', image: 'assets/skunk.png' },
    { name: 'Badger', image: 'assets/badger.png' },
    { name: 'Beaver', image: 'assets/beaver.png' },
    { name: 'Otter', image: 'assets/otter.png' }
];

let currentAnimal;
let score = 0;
let timer;
let timeLeft = 30;
let isGameOver = false;

const animalNameElement = document.getElementById('animal-name');
const imageContainer = document.getElementById('image-container');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const gameOverOverlay = document.getElementById('game-over-overlay');
const finalScoreElement = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');

function preloadImages() {
    animals.forEach(animal => {
        const img = new Image();
        img.src = animal.image;
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    gameOverOverlay.style.display = 'none';
    score = 0;
    timeLeft = 30;
    isGameOver = false;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}`;
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    nextRound();
}

function endGame() {
    isGameOver = true;
    finalScoreElement.textContent = score;
    gameOverOverlay.style.display = 'flex';
}

function nextRound() {
    // Get a random animal
    currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    animalNameElement.textContent = currentAnimal.name;

    // Get 15 other random animals
    const otherAnimals = animals.filter(animal => animal.name !== currentAnimal.name);
    const randomAnimals = shuffle(otherAnimals).slice(0, 15);

    // Add the correct animal and shuffle
    const displayAnimals = shuffle([...randomAnimals, currentAnimal]);
    
    imageContainer.innerHTML = '';
    displayAnimals.forEach(animal => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');

        const img = document.createElement('img');
        img.src = animal.image;
        img.alt = animal.name;
        img.dataset.name = animal.name;
        img.addEventListener('click', handleImageClick);

        wrapper.appendChild(img);
        imageContainer.appendChild(wrapper);
    });
}

function handleImageClick(event) {
    if (isGameOver) return;

    const clickedImage = event.target;
    const clickedAnimalName = clickedImage.dataset.name;

    if (clickedAnimalName === currentAnimal.name) {
        // Correct
        score++;
        scoreElement.textContent = `Score: ${score}`;
        animalNameElement.textContent = "Correct!";
        animalNameElement.classList.add('text-correct');

        setTimeout(() => {
            animalNameElement.classList.remove('text-correct');
            nextRound();
        }, 500);

    } else {
        // Incorrect
        animalNameElement.classList.add('text-incorrect');
        setTimeout(() => {
            animalNameElement.classList.remove('text-incorrect');
        }, 500);
    }
}

function createSparkles(wrapper) {
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const angle = (i / 12) * 360;
        const x = Math.cos(angle * (Math.PI / 180)) * 100 + 'px';
        const y = Math.sin(angle * (Math.PI / 180)) * 100 + 'px';
        sparkle.style.setProperty('--x', x);
        sparkle.style.setProperty('--y', y);
        wrapper.appendChild(sparkle);
    }
}

playAgainBtn.addEventListener('click', () => {
    startGame();
});

preloadImages();
startGame();
