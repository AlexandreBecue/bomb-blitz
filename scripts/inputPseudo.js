class InputPseudoScene extends Phaser.Scene {
  constructor() {
    super({key: 'InputPseudoScene'});
  }

  create() {
    let bg = this.add.image(0, 0, 'background').setOrigin(0);

    // Redimensionnement de l'image de fond pour qu'elle remplisse l'écran
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;
    this.scale.on('resize', () => {
      bg.displayWidth = this.sys.game.config.width;
      bg.displayHeight = this.sys.game.config.height;
    });

    // Ajout du titre
    this.add.text(this.cameras.main.centerX, 150, 'ENTREZ VOTRE PSEUDO', {
      font: '32px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);
    let usernameInput = document.querySelector("#username-input");
    let backButton = this.add.sprite(75, 75, 'return').setInteractive().setScale(0.1);
    backButton.on('pointerdown', function () {
      usernameInput.style.display = "none";
      this.scene.start('MenuScene');
    }, this);

    backButton.on('pointerover', () => {
      backButton.setScale(0.13);
    });

    backButton.on('pointerout', () => {
      backButton.setScale(0.1);
    });

    usernameInput.style.display = "block";
    usernameInput.style.marginLeft = this.cameras.main.centerX + "px";

    const playButton = this.add.sprite(this.cameras.main.centerX, 500, 'playButton').setInteractive().setScale(0.7);
    playButton.on('pointerover', () => {
      playButton.setScale(0.8);
    });

    playButton.on('pointerout', () => {
      playButton.setScale(0.7);
    });

    playButton.on('pointerdown', () => {
      let value = document.querySelector("#username-input").value;
      if (value !== "" && value !== null) {
        localStorage.setItem('username', value);
        this.scene.start('LevelScene');
        usernameInput.style.display = "none";
      }
    });
  }
}
