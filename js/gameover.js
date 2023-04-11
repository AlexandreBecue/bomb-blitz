import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {

    create() {
        // Afficher l'arrière-plan
        this.add.image(400, 300, 'background');

        // Afficher le titre "Game Over"
        this.add.text(400, 100, 'Game Over', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ff0000'
        }).setOrigin(0.5);

        // Afficher le bouton "Rejouer"
        let replayButton = this.add.image(400, 300, 'button').setInteractive();
        replayButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });

        // Ajouter une animation de survol au bouton "Rejouer"
        replayButton.on('pointerover', () => {
            replayButton.setScale(1.1);
        });

        replayButton.on('pointerout', () => {
            replayButton.setScale(1);
        });
    }

}
