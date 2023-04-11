import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {

    create() {
        // Créer l'arrière-plan
        this.add.image(400, 300, 'background');

        // Créer la bombe
        this.bomb = this.add.sprite(400, 300, 'bomb');

        // Créer le cercle de désamorçage
        let disarmingCircle = this.add.sprite(400, 300, 'disarmingCircle');

        // Ajouter l'animation de rotation
        this.tweens.add({
            targets: disarmingCircle,
            angle: 360,
            duration: 2000,
            ease: 'Linear',
            repeat: -1
        });

        // Créer le timer
        this.timer = this.add.sprite(400, 100, 'timer');

        // Ajouter l'animation de remplissage du timer
        this.tweens.add({
            targets: this.timer,
            scaleX: 0,
            duration: 10000,
            ease: 'Linear',
            onComplete: () => {
                this.gameOver();
            }
        });

        // Ajouter un événement de clic sur la bombe
        this.bomb.setInteractive();
        this.bomb.on('pointerdown', () => {
            this.sound.play('click');
            this.timer.scaleX -= 0.1;
            if (this.timer.scaleX <= 0) {
                this.gameOver();
            }
        });
    }

    gameOver() {
        // Arrêter la musique d'ambiance
        this.sound.stopAll();

        // Afficher l'explosion
        this.add.image(400, 300, 'explosion');

        // Jouer le son d'explosion
        this.sound.play('explosion');

        // Ajouter un délai avant de passer à l'écran de fin de partie
        this.time.delayedCall(3000, () => {
            this.scene.start('GameOverScene');
        });
    }

}
