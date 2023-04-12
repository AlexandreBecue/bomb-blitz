class BootScene extends Phaser.Scene {
  constructor() {
    super({key: 'BootScene'});
  }

  preload() {
    // Chargement des ressources nécessaires au jeu
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('playButton', 'assets/images/playButton.png');
    this.load.image('retryButton', 'assets/images/retryButton.png');
    this.load.image('exitButton', 'assets/images/exitButton.png');
    this.load.audio('tense', 'assets/sounds/tense.mp3');
    this.load.audio('clock', 'assets/sounds/clock.mp3');
    this.load.audio('explosion', 'assets/sounds/explosion.mp3');
    this.load.json('levels', 'assets/data/levels.json');
    this.load.image('ranking', 'assets/images/ranking.png');
    this.load.image('return', 'assets/images/returnButton.png');
  }

  create() {
    // Passage à la scène suivante (scène de préchargement)
    this.scene.start('PreloadScene');
  }
}