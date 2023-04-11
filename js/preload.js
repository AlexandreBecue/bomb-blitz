import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {

    preload() {
        // Charger les images
        this.load.image('background', 'assets/images/background.png');
        this.load.image('button', 'assets/images/button.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('timer', 'assets/images/timer.png');
        this.load.image('explosion', 'assets/images/explosion.png');

        // Charger les sons
        this.load.audio('backgroundMusic', 'assets/audio/background.mp3');
        this.load.audio('click', 'assets/audio/click.mp3');
        this.load.audio('explosion', 'assets/audio/explosion.mp3');

        // Charger la barre de chargement
        let loadingBar = this.add.sprite(400, 300, 'loadingBar').setScale(2);
        this.load.on('progress', function (value) {
            loadingBar.scaleX = value * 2;
        });
        this.load.on('complete', function () {
            loadingBar.destroy();
        });
    }

    create() {
        this.scene.start('MenuScene');
    }

}
