class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameOverScene'});
    }

    create() {
        // Affichage du fond d'écran
        this.add.image(0, 0, 'background').setOrigin(0);

        // Ajout d'un texte pour indiquer que le joueur a perdu
        this.add.text(this.cameras.main.centerX, 100, 'PERDU', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let backButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'backButton').setInteractive();
        backButton.on('pointerdown', function () {
            this.scene.start('MenuScene');
        }, this);

        backButton.on('pointerover', () => {
            backButton.setScale(1.1);
        });

        backButton.on('pointerout', () => {
            backButton.setScale(1);
        });
        const data = {
            username:  localStorage.getItem('username'),
            score: 12,
        };

        axios.post('/bomb-blitz/api/dashboard.php', data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
