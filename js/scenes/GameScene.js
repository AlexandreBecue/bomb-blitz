import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Charge les images, sons, etc.
		this.load.image('background', 'assets/images/background.png');
		this.load.image('button', 'assets/images/button.png');
        this.load.image('timer', 'assets/images/timer.png');
    }

    create() {
        // Ajouter l'image de fond
        this.add.image(400, 300, 'background');

        const button = this.add.sprite(400, 300, 'button').setInteractive();
        button.on('pointerdown', () => {
            // Gérer le clic sur le bouton
        });

        const timer = this.add.sprite(400, 550, 'timer').setScale(0.5);
        this.tweens.add({
            targets: timer,
            scaleX: 0,
            duration: 30000, // Temps en millisecondes
            ease: 'Linear',
            onComplete: () => {
                // Gérer la fin du temps imparti
            }
        });
    }

    update() {
        // Met à jour les éléments du jeu
    }
}
