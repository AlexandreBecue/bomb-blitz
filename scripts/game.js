console.log('Hello World!');

// Création de l'objet Phaser.Game
var game = new Phaser.Game({
    // Définition de la taille de l'écran
    width: 800,
    height: 600,
    
    // Utilisation du mode de rendu WebGL ou Canvas
    type: Phaser.AUTO,
    
    // Définition du contexte du jeu
    scene: [ BootScene, PreloadScene, MenuScene, LevelScene, GameOverScene ],
    
    // Définition de la physique du jeu
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    }
  });