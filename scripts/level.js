class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('background-level1', 'assets/images/background-level1.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.image('selector', 'assets/images/selector.png');
    this.load.json('levels', 'assets/data/levels.json');
    this.load.image('cursor', 'assets/images/cursor.png');
    this.load.audio('bomb-blitz-tense-2', 'assets/sounds/bomb-blitz-tense-2.mp3');
    this.load.audio('sirene_police_1', 'assets/sounds/sirene_police_1.mp3');
    this.load.audio('clock', 'assets/sounds/clock.mp3');

  }

  create() {
    // Affichage du fond d'écran
    let bg = this.add.image(0, 0, 'background-level1').setOrigin(0);

    // Ajout de la musique
    let music = this.sound.add('clock');
    music.play();
    music.volume = 0.15;
  
    // Redimensionnement de l'image de fond pour qu'elle remplisse l'écran
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;
    this.scale.on('resize', () => {
      bg.displayWidth = this.sys.game.config.width;
      bg.displayHeight = this.sys.game.config.height;
    });

    // Récupération des informations du premier niveau
    if (localStorage.getItem('currentLevel') === null) {
      localStorage.setItem('currentLevel', '1');
      localStorage.setItem('score', '0');
    }
    let bombLevels = this.cache.json.get('levels').levels.length-1;
    let currentBombLevel = Math.round(Math.random()*bombLevels);
    let levelData = this.cache.json.get('levels').levels[currentBombLevel];

    // Ajout du texte de niveau
    let levelText = this.add.text(this.cameras.main.centerX, 100, 'Niveau ' + localStorage.getItem('currentLevel'), {
      font: '32px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    let hintText = this.add.text(levelText.x-200, levelText.y + 20, "Arrêtez le curseur dans la zone pour désamorser la bombe !", {
      font: 'italic 16px Arial',
      fill: '#ccd6db'
    })

    // Consigne pour arreter le curseur
    let ruleText = this.add.text(levelText.x - 70, hintText.y + 25, "\"Espace\" pour arrêter", {
      font: 'italic 16px Arial',
      fill: '#ccd6db'
    })

    // Ajout de la bombe à désamorcer
    //let bomb = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'bomb');

    // Calcul de la vitesse de rotation du curseur en fonction du niveau
    let baseRotationSpeed = 0.02; // Vitesse de rotation de base (radians par image)
    this.cursorRotationSpeed = baseRotationSpeed * levelData.levelNumber;
    
    // Ajout de l'écouteur d'événements pour la touche "espace"
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    let circleRadius = 100;

    // Dessin du cercle au milieu du jeu
    let circleBg = new Phaser.Geom.Circle(this.cameras.main.centerX, this.cameras.main.centerY, circleRadius+10);
    let circleGraphicsBg = this.add.graphics();
    circleGraphicsBg.fillStyle(0x000000, 0.3);

    let circle = new Phaser.Geom.Circle(this.cameras.main.centerX, this.cameras.main.centerY, circleRadius);
    let circleGraphics = this.add.graphics({ lineStyle: { width: 6, color: 0xffffff } });

    circleGraphicsBg.fillCircle(this.cameras.main.centerX, this.cameras.main.centerY, circleRadius+30);
    circleGraphics.strokeCircleShape(circle);

    // Ajout du curseur qui tourne sur les contours du cercle
    let cursor = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'cursor');
    cursor.setOrigin(0.5, 1); // Positionne l'origine du curseur à sa base

    // 
    this.cursor = cursor;

    let angle = 0;

    // Variable pour contrôler la rotation du curseur
    let cursorRotating = true;
    let rotationSens = 1;
    if (localStorage.getItem('currentLevel') > 15) {
      rotationSens = Math.round(Math.random());
      if (rotationSens === 0) {
        rotationSens = -1;
      }
    }

    // Faire tourner le curseur autour du cercle
    this.time.addEvent({
      delay: 5,
      loop: true,
      callback: () => {
        if (cursorRotating) {
          angle += 2*(1+parseInt(localStorage.getItem('currentLevel'))/10) * rotationSens;
          this.cursor.rotation = Phaser.Math.DegToRad(angle);
        }
      }
    });

    // Coordonnées du centre du cercle
    let circleCenterX = this.cameras.main.centerX;
    let circleCenterY = this.cameras.main.centerY;

    // Génération d'un angle aléatoire en degrés pour positionner le rectangle
    let rectangleAngle = Phaser.Math.Between(0, 360);

    // Conversion de l'angle en radians
    let rectangleAngleRadians = Phaser.Math.DegToRad(rectangleAngle);

    // Calcul des coordonnées du rectangle en utilisant des coordonnées polaires
    let rectangleX = circleCenterX + circleRadius * Math.cos(rectangleAngleRadians);
    let rectangleY = circleCenterY + circleRadius * Math.sin(rectangleAngleRadians);

    let rectWidth = 70-parseInt(localStorage.getItem('currentLevel'));

    // Ajout du rectangle avec les coordonnées calculées
    ///////let zoneRectangleBg = this.add.rectangle(rectangleX, rectangleY, 12, rectWidth+2, 0x000000);
    let zoneRectangle = this.add.rectangle(rectangleX, rectangleY, 10, rectWidth, 0x63af43);

    // Rotation du rectangle pour qu'il soit tangent au cercle
    /////////zoneRectangleBg.rotation = rectangleAngleRadians;
    zoneRectangle.rotation = rectangleAngleRadians;

    // Lorsque la touche "espace" est enfoncée, arrêtez ou démarrez la rotation du curseur
    spaceKey.on('down', () => {
      cursorRotating = !cursorRotating;

      //console.log(this.cursor, zoneRectangle, circleRadius);

      if (this.isCursorInRect(this.cursor.angle, zoneRectangle.angle, rectWidth, circleRadius)) {
        localStorage.setItem('score', (parseInt(localStorage.getItem('currentLevel'))*timeLeft).toString());
        localStorage.setItem('currentLevel', (parseInt(localStorage.getItem('currentLevel'))+1).toString());
        this.scene.start('LevelScene');
        music.stop();
      } else {
        let score = localStorage.getItem('score');
        let currentLevel = localStorage.getItem('currentLevel');
        console.log({score});
        console.log({currentLevel});
        this.scene.start('GameOverScene');
        music.stop();
      }
    });

    // Ajout du sélecteur pour désamorcer la bombe
    //let selector = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'selector');
    //selector.setScale(0.8);
    let codeInput = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY + 200, 'input', 'font-size: 32px; width: 200px; height: 40px; padding: 10px; border: none; border-radius: 5px; text-align: center;');
    codeInput.node.placeholder = 'Saisir le code';


    // Ajout du bouton pour vérifier le code
    let checkCodeButton = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY + 300, 'button', 'font-size: 24px; width: 150px; height: 50px; padding: 10px; border: none; border-radius: 5px; background-color: #008CBA; color: #ffffff;', 'Vérifier le code');
    checkCodeButton.addListener('click');
    checkCodeButton.on('click', function () {
        let code = codeInput.node.value;
        if (code == levelData.code) {
            // Le code est correct, passer au niveau suivant
            console.log('Code correct !');
        } else {
            // Le code est incorrect, afficher un message d'erreur
            console.log('Code incorrect !');
        }
    }, this);

    
        let menuButton = this.add.text(this.cameras.main.width - 10, this.cameras.main.height - 50, 'Menu', {
          font: '24px Arial',
          fill: '#ffffff'
        }).setOrigin(1, 0).setInteractive();
        menuButton.on('pointerdown', function () {
          this.scene.start('MenuScene');
          music.stop();
        }, this);

        // Configuration du compte à rebours
        let timeLeft = levelData.timeLimit*1000;
        let timerText = this.add.text(10, 10, 'Temps restant: ' + Math.ceil(timeLeft/10), {
          font: '24px Arial',
          fill: '#ffffff'
        }).setOrigin(0);

        this.time.addEvent({
          delay: 100,
          loop: true,
          callback: function () {
            timeLeft--;
            timerText.setText('Temps restant: ' + Math.ceil(timeLeft/10));

            if (timeLeft === 0) {
              // Code pour gérer la fin du jeu si le temps est écoulé
              this.scene.start('GameOverScene');
            }
          },
          callbackScope: this
        });
      }

      update () {

        // Pour l'augmentation de la vitesse de rotation en fonction du niveau actuel
        //this.cursor.rotation += this.cursorRotationSpeed;
      }

      isCursorInRect(cursorAngleTT, rectAngle, rectWidth, circleRadius) {
        let circonfTotaleCercle = 2 * Math.PI * circleRadius;

        let cursorAngle = cursorAngleTT - 90;
        if (cursorAngle <= -180) {
          cursorAngle += 360;
        }
        let decalage = ((rectWidth/2)/circonfTotaleCercle) * 360;

        let rectAngleMin = rectAngle - decalage;
        let rectAngleMax = rectAngle + decalage;

        let isRectAngleModified = false;

        if (rectAngleMin < -180) {
          isRectAngleModified = true;
          rectAngleMin += 360;
        }

        if (rectAngleMax > 180) {
          isRectAngleModified = true;
          rectAngleMax -= 360;
        }

        let returnedValue = cursorAngle >= rectAngleMin && cursorAngle <= rectAngleMax;

        if (isRectAngleModified) {
          returnedValue = cursorAngle >= rectAngleMin || cursorAngle <= rectAngleMax;
        }

        return returnedValue;
      }
    }