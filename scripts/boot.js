class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: 'BootScene' });
    }
  
    preload() {
      // Chargement des ressources nécessaires au jeu
      this.load.image('background', 'assets/images/background.png');
      this.load.image('selector', 'assets/images/selector.png');
      this.load.image('button', 'assets/images/button.png');
      this.load.image('backButton', 'assets/images/backbutton.png');
      this.load.audio('tick', 'assets/sounds/tick.mp3');
      this.load.json('levels', 'assets/data/levels.json');
      this.load.image('leaderboard', 'assets/images/leaderboard.png');
    }
  
    create() {
      // Passage à la scène suivante (scène de préchargement)
      this.scene.start('PreloadScene');
    }
  }