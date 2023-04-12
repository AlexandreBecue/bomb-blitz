class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({key: 'LeaderboardScene'});
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

    this.add.text(this.cameras.main.centerX, 100, 'TABLEAU DES SCORES', {
      font: '32px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    let backButton = this.add.sprite(75, 75, 'return').setInteractive().setScale(0.1);
    backButton.on('pointerdown', function () {
      this.scene.start('MenuScene');
    }, this);

    backButton.on('pointerover', () => {
      backButton.setScale(0.13);
    });

    backButton.on('pointerout', () => {
      backButton.setScale(0.1);
    });


    const tableContainer = this.add.container(this.cameras.main.centerX, 200);

    const headerRow = this.add.container(0, 0);
    const usernameFields = this.add.text(-350, 0, "Username");
    usernameFields.setStyle({fontSize: '48px'});
    const scoreFields = this.add.text(100, 0, "Score");
    scoreFields.setStyle({fontSize: '48px'});
    headerRow.add(usernameFields);
    headerRow.add(scoreFields);
    tableContainer.add(headerRow);

    axios.get('/bomb-blitz/api/leaderboard.php').then((response) => {
      // Parcours de la liste des scores
      response.data.forEach((score, i) => {
        const row = this.add.container(0, (i + 2) * 35);
        const username = this.add.text(-350, 0, score.username);
        username.setStyle({fontSize: '32px'});
        username.setStyle({align: 'left'});
        const scoreText = this.add.text(100, 0, score.score);
        scoreText.setStyle({fontSize: '32px'});
        scoreText.setStyle({align: 'right'});
        row.add(username);
        row.add(scoreText);
        tableContainer.add(row);
      });
    });

  }
}
