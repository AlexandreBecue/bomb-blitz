class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
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

        // Ajout de la musique
        let music = this.sound.add('bomb-blitz-tense-2');
        music.play();
        music.volume = 0.15;

        // Ajout d'un titre
        this.add.text(this.cameras.main.centerX, 100, 'Le compte à rebours explosif', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Ajout d'un bouton pour commencer le jeu
        let playButton = this.add.sprite(this.cameras.main.centerX, 200, 'button').setInteractive();
        let leaderboardButton = this.add.sprite(this.cameras.main.centerX, 400, 'leaderboard').setInteractive();
        playButton.on('pointerover', () => {
            playButton.setScale(1.1);
        });

        playButton.on('pointerout', () => {
            playButton.setScale(1);
        });
        leaderboardButton.on('pointerover', () => {
            leaderboardButton.setScale(1.1);
        });

        leaderboardButton.on('pointerout', () => {
            leaderboardButton.setScale(1);
        });

        // Ajout d'un événement de clic sur le bouton de jeu
        playButton.on('pointerdown', function () {
            this.scene.start('InputPseudoScene');
            music.stop();
        }, this);
        leaderboardButton.on('pointerdown', function () {
            this.scene.start('DashboardScene');
            music.stop();
        }, this);
    }
}