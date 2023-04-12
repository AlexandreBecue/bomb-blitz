class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    create() {
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

        // Ajout de la musique
        let music = this.sound.add('bomb-blitz-tense-2');
        music.play();
        music.volume = 0.15;

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

        let leaderboardButton = this.add.sprite(this.cameras.main.centerX, 400, 'leaderboard').setInteractive();

        playButton.on('pointerover', () => {
            playButton.setScale(scale+0.1);
        });

        playButton.on('pointerout', () => {
            playButton.setScale(scale);
        });
        leaderboardButton.on('pointerover', () => {
            leaderboardButton.setScale(1.1);
        });

        leaderboardButton.on('pointerout', () => {
            leaderboardButton.setScale(1);
        });

        // Ajout d'un événement de clic sur le bouton de jeu
        playButton.on('pointerdown', function () {
            this.scene.start('LevelScene');
            music.stop();
        }, this);
        leaderboardButton.on('pointerdown', function () {
            this.scene.start('DashboardScene');
            music.stop();
        }, this);
    }
}