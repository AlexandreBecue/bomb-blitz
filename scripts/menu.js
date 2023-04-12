class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    create() {
        if (localStorage.getItem('music') === 'true') {
            let music = this.sound.add('bomb-blitz-tense');
            music.play();
            music.loop = true
            music.volume = 0.15;
            localStorage.setItem('music', 'false');
        }

        // Affichage du fond d'écran
        let bg = this.add.image(0, 0, 'background').setOrigin(0);

        // Redimensionnement de l'image de fond pour qu'elle remplisse l'écran
        let screenWidth = this.sys.game.config.width;
        let screenHeight = this.sys.game.config.height;

        bg.displayWidth = screenWidth;
        bg.displayHeight = screenHeight;
        this.scale.on('resize', () => {
            bg.displayWidth = this.sys.game.config.width;
            bg.displayHeight = this.sys.game.config.height;
        });

        // Ajout d'un titre
        this.add.text(this.cameras.main.centerX, 100, 'BombBlitz', {
            font: '128px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Ajout d'un bouton pour commencer le jeu
        let playButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'playButton').setInteractive();

        let scaleX = screenWidth / playButton.width / 2;
        let scaleY = screenHeight / playButton.height / 2;
        let scale = Math.min(scaleX, scaleY);
        playButton.setScale(scale);

        let leaderboardButton = this.add.sprite(0, 0, 'ranking').setInteractive();
        leaderboardButton.setOrigin(1, 0);
        leaderboardButton.setPosition(this.cameras.main.width, 0);

        leaderboardButton.setScale(scale/3);

        playButton.on('pointerover', () => {
            playButton.setScale(scale+0.1);
        });

        playButton.on('pointerout', () => {
            playButton.setScale(scale);
        });
        leaderboardButton.on('pointerover', () => {
            leaderboardButton.setScale(scale/3+0.1);
        });

        leaderboardButton.on('pointerout', () => {
            leaderboardButton.setScale(scale/3);
        });

        // Ajout d'un événement de clic sur le bouton de jeu
        playButton.on('pointerdown', function () {
            this.scene.start('InputPseudoScene');
        }, this);
        leaderboardButton.on('pointerdown', function () {
            this.scene.start('LeaderboardScene');
        }, this);
    }
}