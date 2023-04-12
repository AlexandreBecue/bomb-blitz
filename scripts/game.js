console.log('Hello World!');

// Création de l'objet Phaser.Game
var game = new Phaser.Game({
    // Définition de la taille de l'écran
    width: window.innerWidth-40,
    height: window.innerHeight-40,
    
    // Utilisation du mode de rendu WebGL ou Canvas
    type: Phaser.AUTO,
    
    // Définition du contexte du jeu
    scene: [ BootScene, PreloadScene, MenuScene, LevelScene, GameOverScene, DashboardScene ],
    
    // Définition de la physique du jeu
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    }
  });

function resizeGame() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth-20;
  const windowHeight = window.innerHeight-20;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = (windowWidth / gameRatio) + 'px';
  } else {
    canvas.style.width = (windowHeight * gameRatio) + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

// Ajoutez le gestionnaire d'événements pour gérer le redimensionnement de la fenêtre du navigateur
window.addEventListener('resize', function () {
  resizeGame();
});

// Appelez resizeGame() après la création du jeu pour définir la taille initiale
resizeGame();
