class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.image('selector', 'assets/images/selector.png');
    this.load.json('levels', 'assets/data/levels.json');
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

    // Récupération des informations du premier niveau
    let levelData = this.cache.json.get('levels').levels[0];
    let currentLevel = 0;

    // Ajout du texte de niveau
    let levelText = this.add.text(this.cameras.main.centerX, 100, 'Niveau ' + levelData.levelNumber, {
      font: '32px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Ajout de la bombe à désamorcer
    let bomb = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'bomb');
    
    // Ajout du sélecteur pour désamorcer la bombe
    let selector = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'selector');
    selector.setScale(0.8);
    let codeInput = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY + 200, 'input', 'font-size: 32px; width: 200px; height: 40px; padding: 10px; border: none; border-radius: 5px; text-align: center;');
    codeInput.node.placeholder = 'Saisir le code';


    // Ajout du bouton pour vérifier le code
    let checkCodeButton = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY + 300, 'button', 'font-size: 24px; width: 150px; height: 50px; padding: 10px; border: none; border-radius: 5px; background-color: #008CBA; color: #ffffff;', 'Vérifier le code');
    checkCodeButton.addListener('click');
    checkCodeButton.on('click', function () {
        let code = codeInput.node.value;
        if (code == levelData.code) {
            // Le code est correct, passer au niveau suivant
            console.log('Code correct !');
        } else {
            // Le code est incorrect, afficher un message d'erreur
            console.log('Code incorrect !');
        }
    }, this);

    
        let menuButton = this.add.text(this.cameras.main.width - 10, this.cameras.main.height - 50, 'Menu', {
          font: '24px Arial',
          fill: '#ffffff'
        }).setOrigin(1, 0).setInteractive();
        menuButton.on('pointerdown', function () {
          this.scene.start('MenuScene');
        }, this);

        // Configuration du compte à rebours
        let timeLeft = levelData.timeLimit;
        let timerText = this.add.text(10, 10, 'Temps restant: ' + timeLeft, {
          font: '24px Arial',
          fill: '#ffffff'
        }).setOrigin(0);

        this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: function () {
            timeLeft--;
            timerText.setText('Temps restant: ' + timeLeft);

            if (timeLeft === 0) {
              // Code pour gérer la fin du jeu si le temps est écoulé
              this.scene.start('GameOverScene');
            }
          },
          callbackScope: this
        });
      }
    }