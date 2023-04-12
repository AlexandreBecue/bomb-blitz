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

        this.sound.getAll('beep').forEach(beep => {
            beep.stop();
        });
        this.sound.getAll('fearful').forEach(fearful => {
            fearful.stop();
        });
        if (parseInt(localStorage.getItem('currentLevel')) > 14) {
            this.sound.getAll('scary').forEach(scary => {
                scary.stop();
            });
        }
        let explosion = this.sound.add('explosion');
        explosion.play();
        explosion.volume = 0.15;

        // Ajout d'un texte pour indiquer que le joueur a perdu
        this.add.text(this.cameras.main.centerX, 60, 'AGENT ' + localStorage.getItem('username'), {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let currentLevel = parseInt(localStorage.getItem('currentLevel'))-1;
        let message = 'VOUS AVEZ DÉSAMORCÉ ' + currentLevel.toString() + (currentLevel>1 ? " BOMBES !" : " BOMBE !");
        this.add.text(this.cameras.main.centerX, 100, message, {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX, 150, 'Score : ' + localStorage.getItem('score'), {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let retryButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'retryButton').setInteractive();
        retryButton.on('pointerdown', function () {
            this.scene.start('LevelScene');
            this.sound.getAll('explosion').forEach(explosion => {
                explosion.stop();
            });
        }, this);

        retryButton.on('pointerout', () => {
            retryButton.setScale(1);
        });

        let exitButton = this.add.sprite(this.cameras.main.centerX, 700, 'exitButton').setInteractive();
        exitButton.on('pointerdown', function () {
            localStorage.setItem('music', 'true');
            this.scene.start('MenuScene');
            this.sound.getAll('explosion').forEach(explosion => {
                explosion.stop();
            });
        }, this);

        exitButton.on('pointerout', () => {
            exitButton.setScale(1);
        });

        const data = {
            username:  localStorage.getItem('username'),
            score: localStorage.getItem('score'),
        };

        localStorage.setItem('currentLevel', '1');
        localStorage.setItem('score', '0');

        axios.post('/bomb-blitz/api/leaderboard.php', data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
