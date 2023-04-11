class MenuScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MenuScene' });
    }
  
    create() {
      // Affichage du fond d'écran
      let bg = this.add.image(0, 0, 'background').setOrigin(0);
  
    // Redimensionnement de l'image de fond pour qu'elle remplisse l'écran
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;
    this.scale.on('resize', () => {
      bg.displayWidth = this.sys.game.config.width;
      bg.displayHeight = this.sys.game.config.height;
    });
  
      // Ajout d'un titre
      this.add.text(this.cameras.main.centerX, 100, 'Le compte à rebours explosif', {
        font: '32px Arial',
        fill: '#ffffff'
      }).setOrigin(0.5);
  
      // Ajout d'un bouton pour commencer le jeu
      let playButton = this.add.sprite(this.cameras.main.centerX, 200, 'button').setInteractive();
      
      playButton.on('pointerover', () => {
        playButton.setScale(1.1);
      });

      playButton.on('pointerout', () => {
        playButton.setScale(1);
      });
      
      // Ajout d'un événement de clic sur le bouton de jeu
      playButton.on('pointerdown', function () {
        this.scene.start('LevelScene');
      }, this);
    }
  }