class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene'});
    }

    preload() {
      this.load.image('background-level1-destoyed', 'assets/images/background-level1-destoyed.png');

    }

    create() {
        // Affichage du fond d'écran
        let bg = this.add.image(0, 0, 'background-level1-destoyed').setOrigin(0);

        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;
        this.scale.on('resize', () => {
          bg.displayWidth = this.sys.game.config.width;
          bg.displayHeight = this.sys.game.config.height;
        });

        let music = this.sound.add('explosion');
        music.play();
        music.volume = 0.15;

        // Ajout d'un texte pour indiquer que le joueur a perdu
        this.add.text(this.cameras.main.centerX, 100, 'PERDU', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let backButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'backButton').setInteractive();
        backButton.on('pointerdown', function () {
            this.scene.start('MenuScene');
            music.stop();
        }, this);

        backButton.on('pointerover', () => {
            backButton.setScale(1.1);
        });

        backButton.on('pointerout', () => {
            backButton.setScale(1);
        });

        const data = {
            username:  localStorage.getItem('username'),
            score: localStorage.getItem('score'),
        };

        localStorage.setItem('currentLevel', '1');
        localStorage.setItem('score', '0');

        axios.post('/bomb-blitz/api/dashboard.php', data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
