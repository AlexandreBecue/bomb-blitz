import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {

    create() {
        // Afficher l'arrière-plan
        this.add.image(400, 300, 'background');

        // Afficher le titre du jeu
        this.add.text(400, 100, 'Bomb Blitz', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ff0000'
        }).setOrigin(0.5);

        // Afficher le bouton "Jouer"
        let playButton = this.add.image(400, 300, 'button').setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });

        /        playButton.on('pointerover', () => {
            playButton.setScale(1.1);
        });

        playButton.on('pointerout', () => {
            playButton.setScale(1);
        });

        // Ajouter de la musique d'ambiance
        let backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        backgroundMusic.play();
    }

}

