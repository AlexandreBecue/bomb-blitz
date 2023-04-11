import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {

    preload() {
        this.load.image('loadingBar', 'assets/images/loading-bar.png');
    }

    create() {
        this.scene.start('PreloadScene');
    }

}
