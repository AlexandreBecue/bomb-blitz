class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: 'BootScene' });
    }
  
    preload() {
      // Chargement des ressources nécessaires au jeu
      this.load.image('background', 'assets/images/background.png');
      this.load.image('selector', 'assets/images/selector.png');
      this.load.image('button', 'assets/images/button.png');
      this.load.image('playButton', 'assets/images/playButton.png');
      this.load.image('backButton', 'assets/images/backbutton.png');
      this.load.audio('bomb-blitz-tense-2', 'assets/sounds/bomb-blitz-tense-2.mp3');
      this.load.audio('sirene_police_1', 'assets/sounds/sirene_police_1.mp3');
      this.load.audio('clock', 'assets/sounds/clock.mp3');
      this.load.audio('explosion', 'assets/sounds/explosion.mp3');
      this.load.json('levels', 'assets/data/levels.json');
      this.load.image('ranking', 'assets/images/ranking.png');
      this.load.image('leaderboard', 'assets/images/leaderboard.png');
      this.load.image('return', 'assets/images/returnButton.png');

    }
  
    create() {
      // Passage à la scène suivante (scène de préchargement)
      this.scene.start('PreloadScene');
    }
  }