class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' });
    }
  
    preload() {
      // Affichage d'une barre de progression
      let progressBar = this.add.graphics();
      let progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(240, 270, 320, 50);
  
      let width = this.cameras.main.width;
      let height = this.cameras.main.height;
      let loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Chargement en cours...',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
      });
      loadingText.setOrigin(0.5, 0.5);
  
      let percentText = this.make.text({
        x: width / 2,
        y: height / 2 + 25,
        text: '0%',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        }
      });
      percentText.setOrigin(0.5, 0.5);
  
      let assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 80,
        text: '',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        }
      });
      assetText.setOrigin(0.5, 0.5);
  
      // Mise à jour de la barre de progression
      this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });

      // Ajout de la musique
      let music = this.sound.add('bomb-blitz-tense');
      music.play();
      music.loop = true
      music.volume = 0.15;
  
      // Chargement des ressources nécessaires au jeu
      this.load.image('background', 'assets/images/background.png');
      this.load.image('selector', 'assets/images/selector.png');
      this.load.audio('bomb-blitz-tense', 'assets/sounds/bomb-blitz-tense.mp3');
      this.load.audio('sirene_police_1', 'assets/sounds/sirene_police_1.mp3');
      this.load.json('levels', 'assets/data/levels.json');
      this.load.audio('explosion', 'assets/sounds/explosion.mp3');
      this.load.audio('clock', 'assets/sounds/clock.mp3');
    }
  
    create() {
      // Passage à la scène suivante (scène de menu)
      this.scene.start('MenuScene');
    }
  }