class DashboardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DashboardScene' });
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

        this.add.text(this.cameras.main.centerX, 100, 'Dashboard', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let backButton = this.add.sprite(75, 75, 'return').setInteractive();
        backButton.on('pointerdown', function () {
            this.scene.start('MenuScene');
        }, this);

        backButton.on('pointerover', () => {
            backButton.setScale(1.1);
        });

        backButton.on('pointerout', () => {
            backButton.setScale(1);
        });


        const tableContainer = this.add.container(325, 150);

        const headerRow = this.add.container(0, 0);
        headerRow.add(this.add.text(0, 0, "Username", { fill: "#ffffff" }));
        headerRow.add(this.add.text(100, 0, "Score", { fill: "#ffffff" }));
        tableContainer.add(headerRow);

        axios.get('/bomb-blitz/api/dashboard.php').then((response) => {
            // Parcours de la liste des scores
            response.data.forEach((score, i) => {
                const row = this.add.container(0, (i + 1) * 30);
                row.add(this.add.text(0, 0, score.username, { fill: "#ffffff" }));
                row.add(this.add.text(100, 0, score.score, { fill: "#ffffff" }));
                tableContainer.add(row);
            });
        });
        //add button
    }
}
