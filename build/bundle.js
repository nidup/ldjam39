/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/// <reference path="../lib/phaser.d.ts"/>
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot_1 = __webpack_require__(1);
	var Preload_1 = __webpack_require__(2);
	var Menu_1 = __webpack_require__(3);
	var Play_1 = __webpack_require__(4);
	var SimpleGame = (function (_super) {
	    __extends(SimpleGame, _super);
	    function SimpleGame() {
	        _super.call(this, 1280, 800, Phaser.CANVAS, "content", null);
	        this.state.add('Boot', Boot_1.default);
	        this.state.add('Preload', Preload_1.default);
	        this.state.add('Menu', Menu_1.default);
	        this.state.add('Play', Play_1.default);
	        this.state.start('Boot');
	    }
	    return SimpleGame;
	}(Phaser.Game));
	window.onload = function () {
	    new SimpleGame();
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot = (function (_super) {
	    __extends(Boot, _super);
	    function Boot() {
	        _super.apply(this, arguments);
	    }
	    Boot.prototype.create = function () {
	        this.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.state.start('Preload');
	    };
	    return Boot;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Boot;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Preload = (function (_super) {
	    __extends(Preload, _super);
	    function Preload() {
	        _super.apply(this, arguments);
	    }
	    Preload.prototype.preload = function () {
	        this.load.tilemap('intro', 'assets/forrest/intro.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.tilemap('level2', 'assets/forrest/level2.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.tilemap('level3', 'assets/forrest/level3.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.tilemap('level4', 'assets/forrest/level4.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.tilemap('level5', 'assets/forrest/level5.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.image('tiles-1', 'assets/forrest/tiles.png');
	        this.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
	        this.load.spritesheet('lionel', 'assets/forrest/lionel-big.png', 64, 64);
	        this.load.spritesheet('michel', 'assets/forrest/michel.png', 64, 64);
	        this.load.spritesheet('glasses', 'assets/forrest/lionel-glasses.png', 64, 64);
	        this.load.spritesheet('door', 'assets/forrest/door.png', 60, 100);
	        this.load.spritesheet('box', 'assets/forrest/box.png', 20, 20);
	        this.load.spritesheet('king', 'assets/forrest/king.png', 32, 32);
	        this.load.spritesheet('gnome', 'assets/forrest/gnome.png', 32, 32);
	        this.load.spritesheet('snake', 'assets/forrest/snake.png', 32, 32);
	        this.load.spritesheet('coin', 'assets/forrest/coins.png', 16, 16);
	        this.load.image('background', 'assets/forrest/background.png');
	        this.load.image('background-day', 'assets/forrest/background-day.png');
	        this.load.image('background-night', 'assets/forrest/background-night.png');
	        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
	        this.load.image('blackout', 'assets/blackout.png');
	        this.load.audio('land_metal_0', 'assets/sounds/LAND_TOLE04.wav');
	        this.load.audio('land_metal_1', 'assets/sounds/LAND_TOLE01.wav');
	        this.load.audio('land_metal_2', 'assets/sounds/LAND_TOLE02.wav');
	        this.load.audio('land_metal_3', 'assets/sounds/LAND_TOLE03.wav');
	        this.load.audio('land_carton_0', 'assets/sounds/LAND_CARTON04.wav');
	        this.load.audio('land_carton_1', 'assets/sounds/LAND_CARTON01.wav');
	        this.load.audio('land_carton_2', 'assets/sounds/LAND_CARTON02.wav');
	        this.load.audio('land_carton_3', 'assets/sounds/LAND_CARTON03.wav');
	        this.load.audio('land_beton_0', 'assets/sounds/LAND_BETON04.wav');
	        this.load.audio('land_beton_1', 'assets/sounds/LAND_BETON01.wav');
	        this.load.audio('land_beton_2', 'assets/sounds/LAND_BETON02.wav');
	        this.load.audio('land_beton_3', 'assets/sounds/LAND_BETON03.wav');
	        this.load.audio('walkMetal', 'assets/sounds/STEP_TOLE_LOOP.wav');
	        this.load.audio('walkBeton', 'assets/sounds/STEP_BETON_LOOP.wav');
	        this.load.audio('walkCarton', 'assets/sounds/STEP_CARTON_LOOP.wav');
	        this.load.audio('day', 'assets/sounds/AMBDAY.wav');
	        this.load.audio('night', 'assets/sounds/AMBNIGHT.wav');
	        this.load.audio('shutdown', 'assets/sounds/SWITCH_SHUTDOWN.wav');
	        this.load.audio('pickup', 'assets/sounds/PICKUP_BOX.wav');
	        this.load.audio('door', 'assets/sounds/DOOR.wav');
	        this.load.audio('ladder', 'assets/sounds/ECHELLE_MONTE.wav');
	        this.load.audio('event_0', 'assets/sounds/AMB_EVENT01.wav');
	        this.load.audio('event_1', 'assets/sounds/AMB_EVENT02.wav');
	        this.load.audio('event_2', 'assets/sounds/AMB_EVENT03.wav');
	        this.load.audio('event_3', 'assets/sounds/AMB_EVENT04.wav');
	        this.load.audio('event_4', 'assets/sounds/AMB_EVENT05.wav');
	        this.load.audio('event_5', 'assets/sounds/AMB_EVENT06.wav');
	    };
	    Preload.prototype.create = function () {
	        this.game.state.start('Menu');
	    };
	    return Preload;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Preload;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu() {
	        _super.apply(this, arguments);
	    }
	    Menu.prototype.create = function () {
	        this.game.stage.backgroundColor = '#1b1128';
	        this.background = this.game.add.tileSprite(0, 0, 1280, 800, 'background', 0);
	        this.background.loadTexture('background');
	        this.map = this.game.add.tilemap('intro');
	        this.map.addTilesetImage('tiles-1');
	        this.layer = this.map.createLayer('Tile Layer 1', 1280, 800);
	        this.layer.resizeWorld();
	        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	        spaceKey.onDown.add(this.startGame, this);
	        this.titleText = this.game.add.bitmapText(440, 150, 'carrier-command', 'Lionel\'s Weekend', 27);
	        this.fadein(this.titleText);
	        this.briefingTextLine1 = this.game.add.bitmapText(440, 250, 'carrier-command', 'Left / right keys to move', 12);
	        this.fadein(this.briefingTextLine1);
	        this.briefingTextLine2 = this.game.add.bitmapText(440, 290, 'carrier-command', 'Space bar to jump', 12);
	        this.fadein(this.briefingTextLine2);
	        this.briefingTextLine3 = this.game.add.bitmapText(440, 330, 'carrier-command', 'Up key to climb ladders', 12);
	        this.fadein(this.briefingTextLine3);
	        this.startText = this.game.add.bitmapText(440, 450, 'carrier-command', 'Press space to start', 12);
	        this.startText.alpha = 0;
	        //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
	        var tween = this.game.add.tween(this.startText).to({ alpha: 1 }, 1000, "Linear", true, 0, -1);
	        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
	        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
	        tween.yoyo(true, 1000);
	        this.authorText = this.game.add.bitmapText(680, 780, 'carrier-command', 'Ludum Date #39 by grena, quentin, baptiste, nidup', 10);
	        this.hero = this.game.add.sprite(500, 577, 'lionel', 0);
	        this.hero.animations.add('idle', [0, 1], 2, true);
	        this.hero.play('idle');
	        this.door = this.game.add.sprite(20, 650, 'door', 0);
	        this.door.animations.add('idle', [0, 1], 0.5, true);
	        this.door.animations.play('idle');
	        this.box = this.game.add.sprite(1220, 590, 'box', 0);
	        this.box.animations.add('idle', [0, 1, 2], 3, true);
	        this.box.animations.play('idle');
	    };
	    Menu.prototype.fadein = function (text) {
	        text.alpha = 0.1;
	        this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
	    };
	    Menu.prototype.startGame = function () {
	        this.game.state.start('Play');
	    };
	    Menu.prototype.shutdown = function () {
	        this.titleText.destroy();
	        this.authorText.destroy();
	        this.briefingTextLine1.destroy();
	        this.briefingTextLine2.destroy();
	        this.briefingTextLine3.destroy();
	        this.startText.destroy();
	        this.hero.destroy();
	        this.map.destroy();
	        this.layer.destroy();
	        this.background.destroy();
	        this.door.destroy();
	        this.box.destroy();
	    };
	    return Menu;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Menu;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Colleague_1 = __webpack_require__(5);
	var Hero_1 = __webpack_require__(6);
	var Box_1 = __webpack_require__(8);
	var SoundManager_1 = __webpack_require__(7);
	var Level_1 = __webpack_require__(9);
	var Door_1 = __webpack_require__(10);
	var Play = (function (_super) {
	    __extends(Play, _super);
	    function Play() {
	        _super.apply(this, arguments);
	        this.blackout = false;
	        this.changingLevel = false;
	        this.levelNumber = 0;
	        this.debug = false;
	    }
	    Play.prototype.create = function () {
	        if (this.debug) {
	            this.game.time.advancedTiming = true;
	        }
	        this.game.stage.backgroundColor = '#9badb7';
	        this.backgroundLayer = this.game.add.group();
	        this.backgroundLayer.name = 'Background';
	        this.groundLayer = this.game.add.group();
	        this.groundLayer.name = 'Ground';
	        this.dayLayer = this.game.add.group();
	        this.dayLayer.name = 'ItemsDay';
	        this.blackoutLayer = this.game.add.group();
	        this.blackoutLayer.name = 'Blackout';
	        this.nightLayer = this.game.add.group();
	        this.nightLayer.name = 'ItemsNight';
	        SoundManager_1.default.instance = new SoundManager_1.default(this.game);
	        SoundManager_1.default.instance.init();
	        this.background = this.game.add.tileSprite(0, 0, 1280, 800, 'background', 0, this.backgroundLayer);
	        this.background.loadTexture('background');
	        this.levels = [
	            new Level_1.Level(1, new Phaser.Point(80, 700), new Phaser.Point(1200, 728), 'Friday 2017/07/07 4:55 pm'),
	            new Level_1.Level(2, new Phaser.Point(80, 573), new Phaser.Point(1100, 728), 'Friday 2017/14/07 4:57 pm'),
	            new Level_1.Level(3, new Phaser.Point(80, 175), new Phaser.Point(1200, 520), 'Friday 2017/21/07 4:51 pm'),
	            new Level_1.Level(5, new Phaser.Point(80, 510), new Phaser.Point(1271, 233), 'Friday 2017/28/07 4:59 pm'),
	            new Level_1.Level(4, new Phaser.Point(80, 190), new Phaser.Point(230, 723), 'Friday 2017/04/08 4:57 pm')
	        ];
	        this.startLevel(0);
	        this.game.camera.follow(this.hero);
	        this.retryKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);
	        SoundManager_1.default.instance.send('InitRoomtone', ['bang']);
	    };
	    Play.prototype.startLevel = function (levelNum) {
	        if (this.changingLevel == true && this.blackout == true) {
	            return;
	        }
	        this.changingLevel = true;
	        // end of game
	        if (!this.levels[levelNum]) {
	            this.retryText.destroy();
	            this.transitionSprite = this.game.add.sprite(0, 0, 'blackout', 0, this.blackoutLayer);
	            this.transitionSprite.alpha = 1;
	            this.transitionText = this.game.add.bitmapText(210, 330, 'carrier-command', 'Arf. I hate fridays.', 26);
	            this.transitionText.alpha = 0;
	            this.door.close();
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverDoor, null);
	            var endOfGameTween = this.game.add.tween(this.transitionText).to({ alpha: 1 }, 10000, "Linear", true);
	            endOfGameTween.onComplete.addOnce(function () {
	                window.location.reload(true);
	            }.bind(this));
	            return;
	        }
	        // next level
	        var level = this.levels[this.levelNumber];
	        // Launc day sound
	        SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverDay, null);
	        // create transition screen
	        this.transitionSprite = this.game.add.sprite(0, 0, 'blackout', 0, this.blackoutLayer);
	        this.transitionSprite.alpha = 1;
	        this.transitionText = this.game.add.bitmapText(210, 330, 'carrier-command', level.getDay(), 26);
	        this.transitionText.alpha = 1;
	        // kill everything
	        if (this.hero) {
	            this.killThemAll();
	        }
	        // create the level
	        this.map = this.game.add.tilemap('level' + level.getNum());
	        this.map.addTilesetImage('tiles-1');
	        this.map.setCollision([
	            1, 2, 3, 4, 5, 6, 7,
	            12, 13, 17,
	            21, 22, 23, 24, 25, 26, 27,
	            32, 33,
	            42,
	            71 // under ladder
	        ]);
	        this.layer = this.map.createLayer('Tile Layer 1', 1280, 800, this.groundLayer);
	        if (this.debug) {
	            this.layer.debug = true;
	        }
	        this.layer.resizeWorld();
	        this.game.physics.arcade.gravity.y = 350;
	        this.box = new Box_1.Box(this.dayLayer, level.getBoxPosition().x, level.getBoxPosition().y, 'box', 0);
	        this.door = new Door_1.Door(this.dayLayer, this.nightLayer, level.getDoorPosition().x, level.getDoorPosition().y, 'door', 0);
	        this.hero = new Hero_1.Hero(this.dayLayer, this.nightLayer, level.getStartPosition().x, level.getStartPosition().y, 'lionel', 0, this.game.input.keyboard);
	        this.colleague = new Colleague_1.Colleague(this.dayLayer, level.getColleaguePosition().x, level.getColleaguePosition().y, 'michel', 0);
	        // make the level appears
	        var duration = 4000;
	        this.game.add.tween(this.transitionText).to({ alpha: 0 }, duration, "Linear", true);
	        var tween = this.game.add.tween(this.transitionSprite).to({ alpha: 0 }, duration, "Linear", true);
	        tween.onComplete.addOnce(function () {
	            this.blackout = false;
	            this.changingLevel = false;
	        }.bind(this));
	    };
	    Play.prototype.killThemAll = function () {
	        this.blackoutSprite.destroy(true);
	        this.hero.destroy(true);
	        this.hero.glasses.destroy(true);
	        this.hero.answerText.destroy(true);
	        this.box.destroy(true);
	        this.door.destroy(true);
	        this.map.destroy();
	        this.layer.destroy();
	        this.door.nightDoor.destroy(true);
	        this.colleague.destroy(true);
	        this.colleague.weekendText1.destroy(true);
	        this.colleague.weekendText2.destroy(true);
	        this.retryText.destroy(true);
	    };
	    Play.prototype.update = function () {
	        if (this.retryKey.isDown) {
	            this.retryLevel();
	        }
	        this.game.physics.arcade.collide(this.hero, this.layer, function (hero, tile) {
	            hero.changeFloor(tile.index);
	            // Handle the fact that the hero may be in the air, so, handle landing
	            if (!hero.wasOnFloor && !hero.body.onWall()) {
	                hero.lands();
	                hero.wasOnFloor = true;
	            }
	        });
	        this.hero.update();
	        this.game.physics.arcade.collide(this.box, this.layer);
	        this.box.update();
	        this.game.physics.arcade.collide(this.hero, this.box, function () {
	            this.box.destroy();
	            this.colleague.switchOffTheLight(function () {
	                this.blackoutSprite = this.game.add.sprite(0, 0, 'blackout', 0, this.blackoutLayer);
	                this.blackoutSprite.alpha = 1;
	                this.blackout = true;
	                this.hero.byNight();
	                this.door.byNight();
	                SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverBox, [SoundManager_1.default.ActionBang]);
	                SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverShutdown, [SoundManager_1.default.ActionBang]);
	                SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverNight, null);
	                this.retryText = this.game.add.bitmapText(50, 50, 'carrier-command', '(Press R to retry this level)', 10);
	                this.fadein(this.retryText);
	            }.bind(this), this.hero);
	        }.bind(this), null, this);
	        this.game.physics.arcade.collide(this.hero, this.door, function () {
	            if (this.blackout && !this.changingLevel) {
	                this.levelNumber++;
	                this.startLevel(this.levelNumber);
	            }
	        }.bind(this), null, this);
	        SoundManager_1.default.instance.playRandomEvent();
	    };
	    Play.prototype.retryLevel = function () {
	        if (this.blackout) {
	            this.startLevel(this.levelNumber);
	        }
	    };
	    Play.prototype.render = function () {
	        if (this.debug) {
	            this.game.debug.body(this.hero);
	            this.game.debug.body(this.box);
	            this.game.debug.body(this.door);
	            this.game.debug.body(this.door.nightDoor);
	            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
	        }
	    };
	    Play.prototype.fadein = function (text) {
	        text.alpha = 0.1;
	        this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
	    };
	    return Play;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Play;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Colleague = (function (_super) {
	    __extends(Colleague, _super);
	    function Colleague(dayGroup, x, y, key, frame) {
	        _super.call(this, dayGroup.game, x, y, key, frame);
	        this.originX = x;
	        this.originY = y;
	        this.finishX = x;
	        this.anchor.setTo(.5, .5);
	        this.animations.add('idle', [0, 1], 2, true);
	        this.animations.add('right', [4, 5, 6, 7], 6, true);
	        this.weekendText1 = this.game.add.bitmapText(210, 330, 'carrier-command', 'Somebody is here?', 10, dayGroup);
	        this.weekendText1.alpha = 0;
	        this.weekendText2 = this.game.add.bitmapText(210, 330, 'carrier-command', 'No? Anyway, weekend time!', 10, dayGroup);
	        this.weekendText2.alpha = 0;
	        this.alpha = 0;
	        dayGroup.add(this);
	    }
	    Colleague.prototype.switchOffTheLight = function (onceSwitchedOffCallback, hero) {
	        this.alpha = 1;
	        this.animations.play('right');
	        var tween = this.game.add.tween(this).to({ x: this.x + 40 }, 500, 'Linear', true);
	        tween.onComplete.addOnce(function () {
	            this.animations.play('idle');
	            this.weekendText1.alpha = 1;
	            this.weekendText1.x = this.x - 10;
	            this.weekendText1.y = this.y - 50;
	            var duration = 4000;
	            var tweenText = this.game.add.tween(this.weekendText1).to({ alpha: 0.5 }, duration, "Linear", true);
	            hero.answer();
	            tweenText.onComplete.addOnce(function () {
	                this.weekendText1.alpha = 0;
	                this.weekendText2.alpha = 1;
	                this.weekendText2.x = this.x - 10;
	                this.weekendText2.y = this.y - 50;
	                var duration = 4000;
	                this.game.add.tween(this.weekendText2).to({ alpha: 0.5 }, duration, "Linear", true);
	                var tweenText2 = this.game.add.tween(this.weekendText2).to({ alpha: 0 }, duration, "Linear", true);
	                tweenText2.onComplete.addOnce(onceSwitchedOffCallback);
	            }.bind(this));
	        }.bind(this));
	    };
	    return Colleague;
	}(Phaser.Sprite));
	exports.Colleague = Colleague;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var SoundManager_1 = __webpack_require__(7);
	var Hero = (function (_super) {
	    __extends(Hero, _super);
	    function Hero(dayGroup, nightGroup, x, y, key, frame, keyboard) {
	        _super.call(this, dayGroup.game, x, y, key, frame);
	        this.jumpTimer = 0;
	        this.climbing = false;
	        this.facing = 'right';
	        this.wasOnFloor = false;
	        this.wasWalking = false;
	        this.walkingFloorIndex = 0;
	        this.answering = false;
	        this.originX = x;
	        this.originY = y;
	        this.finishX = x;
	        this.anchor.setTo(.5, .5);
	        dayGroup.game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.bounce.y = 0.0;
	        this.body.collideWorldBounds = true;
	        this.body.setSize(20, 60, 10, 4);
	        this.body.gravity.y = 1000;
	        this.animations.add('idle-right', [0, 1], 2, true);
	        this.animations.add('idle-left', [2, 3], 4, true);
	        this.animations.add('dancing', [4, 5, 6, 7], 4, true);
	        this.animations.add('right', [8, 9, 10, 11], 6, true);
	        this.animations.add('left', [15, 14, 13, 12], 6, true);
	        this.animations.add('jump-right', [16, 17, 18, 19], 6, false);
	        this.animations.add('jump-left', [23, 22, 21, 20], 6, false);
	        dayGroup.add(this);
	        this.cursorKeys = keyboard.createCursorKeys();
	        this.jumpingKey = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	        this.climbingKey = keyboard.addKey(Phaser.KeyCode.UP);
	        this.glasses = this.game.add.sprite(this.x, this.y, 'glasses', 0, nightGroup);
	        this.glasses.animations.add('idle-right', [0, 1], 2, true);
	        this.glasses.animations.add('idle-left', [2, 3], 2, true);
	        this.glasses.animations.play('idle-right');
	        this.glasses.alpha = 0;
	        this.answerText = this.game.add.bitmapText(210, 330, 'carrier-command', 'YES!', 10, dayGroup);
	        this.answerText.alpha = 0;
	    }
	    Hero.prototype.update = function () {
	        if (this.answering) {
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverStopWalk, null);
	            this.animations.play('idle-left');
	            this.body.velocity.x = 0;
	            this.body.velocity.y = 0;
	            return;
	        }
	        var isWalking = false;
	        this.body.velocity.x = 0;
	        this.updateSoundPan();
	        this.updateWalkingState();
	        // Remember if he was in the AIR
	        if (!this.body.onFloor() && this.wasOnFloor === true) {
	            this.wasOnFloor = false;
	        }
	        if (this.cursorKeys.left.isDown) {
	            this.body.velocity.x = -150;
	            isWalking = true;
	            if (this.facing != 'left') {
	                this.animations.play('left');
	                this.facing = 'left';
	            }
	        }
	        else if (this.cursorKeys.right.isDown) {
	            this.body.velocity.x = 150;
	            isWalking = true;
	            if (this.facing != 'right') {
	                this.animations.play('right');
	                this.facing = 'right';
	            }
	        }
	        else {
	            if (this.facing == 'right' && this.facing != 'idle') {
	                this.animations.play('idle-right');
	                this.facing = 'idle';
	            }
	            else if (this.facing == 'left' && this.facing != 'idle') {
	                this.animations.play('idle-left');
	                this.facing = 'idle';
	            }
	        }
	        if (isWalking) {
	        }
	        if (this.jumpingKey.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverJump, [SoundManager_1.default.ActionBang]);
	            this.body.velocity.y = -500;
	            this.jumpTimer = this.game.time.now + 100;
	            if (this.facing == 'left') {
	                this.animations.play('jump-left');
	                this.facing = 'left';
	            }
	            else if (this.facing == 'right') {
	                this.animations.play('jump-right');
	                this.facing = 'right';
	            }
	            this.animations.currentAnim.onComplete.addOnce(function () {
	                this.animations.play(this.facing);
	            }.bind(this));
	        }
	        var ladderBottom = this.walkingFloorIndex == 71;
	        if (this.climbingKey.isDown) {
	            if (ladderBottom && !this.climbing && this.body.onFloor()) {
	                this.climbing = true;
	                this.climbMaxY = this.y - 150;
	                this.climbMinX = this.x - 5;
	                this.climbMaxX = this.x + 5;
	                SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverLadderStart, null);
	            }
	            if (this.y < this.climbMaxY || this.x < this.climbMinX || this.x > this.climbMaxX) {
	                this.body.velocity.y = +400;
	                this.body.velocity.x = 0;
	                this.climbing = false;
	                SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverLadderStop, null);
	            }
	            else if (this.climbing && (this.x > this.climbMinX || this.x < this.climbMaxX)) {
	                this.body.velocity.y = -150;
	            }
	        }
	        else {
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverLadderStop, null);
	        }
	        this.glasses.x = this.body.x - 10;
	        this.glasses.y = this.body.y - 5;
	        if (this.facing == 'left') {
	            this.glasses.animations.play('idle-left');
	        }
	        else if (this.facing == 'right') {
	            this.glasses.animations.play('idle-right');
	        }
	    };
	    Hero.prototype.answer = function () {
	        this.answering = true;
	        this.answerText.alpha = 1;
	        this.answerText.x = this.x - 40;
	        this.answerText.y = this.y - 50;
	        var duration = 6000;
	        var tweenText = this.game.add.tween(this.answerText).to({ alpha: 0.5 }, duration, "Linear", true);
	        tweenText.onComplete.addOnce(function () {
	            this.answering = false;
	        }.bind(this));
	    };
	    Hero.prototype.byDay = function () {
	        this.glasses.alpha = 0;
	    };
	    Hero.prototype.byNight = function () {
	        this.glasses.alpha = 1;
	    };
	    Hero.prototype.changeOriginPosition = function () {
	        this.originX = this.x;
	        this.originY = this.y;
	    };
	    Hero.prototype.isBackHome = function () {
	        return this.x < this.finishX;
	    };
	    Hero.prototype.changeFloor = function (index) {
	        if (index == this.walkingFloorIndex) {
	            return;
	        }
	        var textureSounds = {
	            // BETON
	            4: SoundManager_1.default.FloorBeton,
	            5: SoundManager_1.default.FloorBeton,
	            6: SoundManager_1.default.FloorBeton,
	            // METAL
	            24: SoundManager_1.default.FloorMetal,
	            25: SoundManager_1.default.FloorMetal,
	            26: SoundManager_1.default.FloorMetal,
	            // CARTON
	            42: SoundManager_1.default.FloorCarton,
	            13: SoundManager_1.default.FloorWater,
	            // LADDER TOP
	            41: SoundManager_1.default.FloorMetal,
	            // LADDER BOTTOM
	            71: SoundManager_1.default.FloorMetal
	        };
	        // console.log('NOW WALKING ON ' + index);
	        this.walkingFloorIndex = index;
	        SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverTexture, [textureSounds[index]]);
	    };
	    Hero.prototype.updateSoundPan = function () {
	        SoundManager_1.default.instance.send('pos', [this.x / 1280]);
	    };
	    Hero.prototype.updateWalkingState = function () {
	        if (!this.body.onFloor()) {
	            // console.log('STOP WALKING');
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverStopWalk, [SoundManager_1.default.ActionBang]);
	            this.wasWalking = false;
	            return;
	        }
	        // Remember if he was walking
	        if (this.body.deltaAbsX() > 0 && !this.wasWalking) {
	            // console.log('START WALKING');
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverStartWalk, [SoundManager_1.default.ActionBang]);
	            this.wasWalking = true;
	            return;
	        }
	        if (this.body.deltaAbsX() == 0 && this.wasWalking) {
	            // console.log('STOP WALKING');
	            SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverStopWalk, [SoundManager_1.default.ActionBang]);
	            this.wasWalking = false;
	            return;
	        }
	    };
	    Hero.prototype.lands = function () {
	        SoundManager_1.default.instance.send(SoundManager_1.default.ReceiverLand, [SoundManager_1.default.ActionBang]);
	    };
	    Hero.prototype.restartLevel = function () {
	        this.x = this.originX;
	        this.y = this.originY;
	    };
	    return Hero;
	}(Phaser.Sprite));
	exports.Hero = Hero;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	var SoundManager = (function () {
	    function SoundManager(game) {
	        this.soundsLandMetal = [];
	        this.soundsLandBeton = [];
	        this.soundsLandCarton = [];
	        this.soundsEvent = [];
	        this.nextEventTime = 0;
	        this.isWalking = false;
	        this.Pd = window.Pd;
	        this.game = game;
	    }
	    SoundManager.prototype.init = function () {
	        this.soundWalkMetal = this.game.add.audio('walkMetal');
	        this.soundWalkBeton = this.game.add.audio('walkBeton');
	        this.soundWalkCarton = this.game.add.audio('walkCarton');
	        this.soundLadder = this.game.add.audio('ladder');
	        this.soundDay = this.game.add.audio('day');
	        this.soundNight = this.game.add.audio('night');
	        this.soundDoor = this.game.add.audio('door');
	        for (var i = 0; i < 4; i++) {
	            this.soundsLandMetal.push(this.game.add.audio('land_metal_' + i));
	            this.soundsLandBeton.push(this.game.add.audio('land_beton_' + i));
	            this.soundsLandCarton.push(this.game.add.audio('land_carton_' + i));
	        }
	        for (var i = 0; i < 6; i++) {
	            this.soundsEvent.push(this.game.add.audio('event_' + i));
	        }
	        this.soundPickup = this.game.add.audio('pickup');
	        this.soundShutdown = this.game.add.audio('shutdown');
	    };
	    SoundManager.prototype.send = function (receiver, parameters) {
	        switch (receiver) {
	            case SoundManager.ReceiverTexture:
	                var changedFloor = this.currentFloorType != parameters[0];
	                this.currentFloorType = parameters[0];
	                if (this.isWalking && changedFloor) {
	                    SoundManager.instance.send(SoundManager.ReceiverStopWalk, [SoundManager.ActionBang]);
	                    SoundManager.instance.send(SoundManager.ReceiverStartWalk, [SoundManager.ActionBang]);
	                }
	                return;
	            case SoundManager.ReceiverLand:
	                console.log('LANDING');
	                var rand = Math.floor(Math.random() * (3));
	                switch (this.currentFloorType) {
	                    case SoundManager.FloorBeton:
	                        return this.soundsLandBeton[rand].play();
	                    case SoundManager.FloorMetal:
	                        return this.soundsLandMetal[rand].play();
	                    case SoundManager.FloorCarton:
	                        return this.soundsLandCarton[rand].play();
	                }
	                return;
	            case SoundManager.ReceiverBox:
	                return this.soundPickup.play();
	            case SoundManager.ReceiverShutdown:
	                return this.soundShutdown.play();
	            case SoundManager.ReceiverStartWalk:
	                this.isWalking = true;
	                switch (this.currentFloorType) {
	                    case SoundManager.FloorBeton:
	                        return this.soundWalkBeton.loopFull(4);
	                    case SoundManager.FloorMetal:
	                        return this.soundWalkMetal.loopFull(4);
	                    case SoundManager.FloorCarton:
	                        return this.soundWalkCarton.loopFull(4);
	                }
	                return;
	            case SoundManager.ReceiverStopWalk:
	                this.isWalking = false;
	                this.soundWalkBeton.stop();
	                this.soundWalkMetal.stop();
	                this.soundWalkCarton.stop();
	                return;
	            case SoundManager.ReceiverDay:
	                this.soundNight.stop();
	                return this.soundDay.loopFull(5);
	            case SoundManager.ReceiverNight:
	                this.soundDay.stop();
	                return this.soundNight.loopFull(5);
	            case SoundManager.ReceiverLadderStart:
	                return this.soundLadder.loopFull(3);
	            case SoundManager.ReceiverLadderStop:
	                return this.soundLadder.stop();
	            case SoundManager.ReceiverDoor:
	                return this.soundDoor.play('', 0, 4);
	        }
	        // this.Pd.send(receiver, parameters);
	    };
	    SoundManager.prototype.playRandomEvent = function () {
	        if (this.game.time.now >= this.nextEventTime) {
	            var min = 12;
	            var max = 25;
	            var randSound = Math.floor(Math.random() * (6));
	            var randNext = Math.floor(Math.random() * (max - min + 1)) + min;
	            this.soundsEvent[randSound].play('', 0, 0.7);
	            this.nextEventTime = this.game.time.now + (randNext * 1000);
	        }
	    };
	    SoundManager.ReceiverDay = 'Day';
	    SoundManager.ReceiverNight = 'Night';
	    SoundManager.ReceiverTexture = 'Texture';
	    SoundManager.ReceiverStartWalk = 'StartWalk';
	    SoundManager.ReceiverStopWalk = 'StopWalk';
	    SoundManager.ReceiverJump = 'Jump';
	    SoundManager.ReceiverLand = 'Land';
	    SoundManager.ReceiverShutdown = 'Shutdown';
	    SoundManager.ReceiverBox = 'Box';
	    SoundManager.ReceiverWin = 'Win';
	    SoundManager.ReceiverLadderStart = 'Ladder';
	    SoundManager.ReceiverLadderStop = 'LadderStop';
	    SoundManager.ReceiverDoor = 'Door';
	    SoundManager.ActionBang = 'bang';
	    SoundManager.FloorBeton = 1;
	    SoundManager.FloorMetal = 2;
	    SoundManager.FloorCarton = 3;
	    SoundManager.FloorWater = 4;
	    return SoundManager;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SoundManager;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Box = (function (_super) {
	    __extends(Box, _super);
	    function Box(group, x, y, key, frame) {
	        _super.call(this, group.game, x, y, key, frame);
	        this.distance = 30;
	        this.limitLeftX = x - this.distance;
	        this.limitRightX = x + this.distance;
	        this.anchor.setTo(.5, .5);
	        group.game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.bounce.y = 0.2;
	        this.body.collideWorldBounds = true;
	        this.body.setSize(18, 16, 8, 16);
	        this.animations.add('blink', [0, 1, 2], 3, true);
	        this.animations.play('blink');
	        this.facing = 'left';
	        this.body.velocity.set(0, 0);
	        this.body.immovable = true;
	        this.body.moves = false;
	        group.add(this);
	    }
	    Box.prototype.update = function () {
	        // if (this.x < this.limitLeftX) {
	        //     this.facing = 'right';
	        // } else if (this.x > this.limitRightX) {
	        //     this.facing = 'left';
	        // }
	        //
	        // if (this.facing == 'left') {
	        //     this.animations.play('left');
	        //     this.body.velocity.x = -this.speed;
	        //
	        // } else if (this.facing == 'right') {
	        //     this.animations.play('right');
	        //     this.body.velocity.x = this.speed;
	        // }
	    };
	    return Box;
	}(Phaser.Sprite));
	exports.Box = Box;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	var Level = (function () {
	    function Level(num, startPosition, boxPosition, day) {
	        this.startPosition = startPosition;
	        this.boxPosition = boxPosition;
	        this.num = num;
	        this.day = day;
	    }
	    Level.prototype.getStartPosition = function () {
	        return this.startPosition;
	    };
	    Level.prototype.getDoorPosition = function () {
	        return new Phaser.Point(this.startPosition.x - 45, this.startPosition.y - 2);
	    };
	    Level.prototype.getColleaguePosition = function () {
	        return new Phaser.Point(this.startPosition.x - 50, this.startPosition.y + 5);
	    };
	    Level.prototype.getBoxPosition = function () {
	        return this.boxPosition;
	    };
	    Level.prototype.getNum = function () {
	        return this.num;
	    };
	    Level.prototype.getDay = function () {
	        return this.day;
	    };
	    return Level;
	}());
	exports.Level = Level;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Door = (function (_super) {
	    __extends(Door, _super);
	    function Door(group, nightGroup, x, y, key, frame) {
	        _super.call(this, group.game, x, y, key, frame);
	        this.distance = 30;
	        this.limitLeftX = x - this.distance;
	        this.limitRightX = x + this.distance;
	        this.anchor.setTo(.5, .5);
	        group.game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.collideWorldBounds = true;
	        this.body.setSize(40, 80, 6, 16);
	        this.animations.add('idle', [0, 1], 0.5, true);
	        this.animations.play('idle');
	        this.facing = 'left';
	        this.body.allowGravity = false;
	        this.body.velocity.set(0, 0);
	        this.body.immovable = true;
	        this.body.moves = false;
	        group.add(this);
	        this.nightDoor = this.game.add.sprite(this.x - 25, this.y - 50, 'door', 0, nightGroup);
	        this.nightDoor.animations.add('idle', [2, 3], 0.5, true);
	        this.nightDoor.animations.add('close', [4, 5], 0.5, true);
	        this.nightDoor.animations.play('idle');
	        this.nightDoor.alpha = 0;
	    }
	    Door.prototype.close = function () {
	        this.nightDoor.animations.play('close');
	    };
	    Door.prototype.byDay = function () {
	        this.nightDoor.alpha = 0;
	    };
	    Door.prototype.byNight = function () {
	        this.nightDoor.alpha = 1;
	    };
	    Door.prototype.update = function () {
	        // if (this.x < this.limitLeftX) {
	        //     this.facing = 'right';
	        // } else if (this.x > this.limitRightX) {
	        //     this.facing = 'left';
	        // }
	        //
	        // if (this.facing == 'left') {
	        //     this.animations.play('left');
	        //     this.body.velocity.x = -this.speed;
	        //
	        // } else if (this.facing == 'right') {
	        //     this.animations.play('right');
	        //     this.body.velocity.x = this.speed;
	        // }
	    };
	    return Door;
	}(Phaser.Sprite));
	exports.Door = Door;


/***/ })
/******/ ]);