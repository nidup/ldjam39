
import {Colleague} from "../Colleague";
import {Hero} from "../Hero";
import {Box} from "../Box";
import SoundManager from "../SoundManager";
import {Level} from "../Level";
import {Door} from "../Door";
import {Rat} from "../Rat";
import {RatPatrol} from "../RatPatrol";
import {Terminal} from "../Terminal";

export default class Play extends Phaser.State
{
    private blackout: boolean = false;
    private changingLevel = false;
    private levels: Level[];
    private levelNumber: number = 0;
    private hero: Hero;
    private colleague: Colleague;
    private box: Box;
    private door: Door;
    private rats: Rat[] = [];
    private terminals: Terminal[] = [];
    private map;
    private layer;
    private background;
    private debug: boolean = false;
    private transitionSprite: Phaser.Sprite;
    private transitionText : Phaser.BitmapText;
    private retryText : Phaser.BitmapText;
    private retryKey: Phaser.Key;
    private blackoutSprite: Phaser.Sprite;

    private backgroundLayer: Phaser.Group;
    private groundLayer: Phaser.Group;
    private dayLayer: Phaser.Group;
    private blackoutLayer: Phaser.Group;
    private nightLayer: Phaser.Group;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
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

        SoundManager.instance = new SoundManager(this.game);
        SoundManager.instance.init();

        this.background = this.game.add.tileSprite(0, 0, 1280, 800, 'background', 0, this.backgroundLayer);
        this.background.loadTexture('background');

        this.levels = [
            new Level(1, new Phaser.Point(80, 700), new Phaser.Point(1200, 728), 'Friday 7th July 4:55 pm', [], []), // new Phaser.Point(140, 704)
            new Level(2, new Phaser.Point(80, 573), new Phaser.Point(1215, 728), 'Friday 14th July 4:57 pm', [], []),
            new Level(3, new Phaser.Point(80, 175), new Phaser.Point(1200, 520), 'Friday 21th July 4:51 pm', [new RatPatrol(80, 510, 203)], [new Phaser.Point(280, 336)]),
            new Level(6, new Phaser.Point(80, 700), new Phaser.Point(630, 584), 'Friday 28th July 4:59 pm', [], [new Phaser.Point(575, 352), new Phaser.Point(915, 416)]),
            new Level(5, new Phaser.Point(80, 510), new Phaser.Point(1271, 233), 'Friday 4th August 5:01 pm', [new RatPatrol(400, 340, 540), new RatPatrol(1070, 510, 1140), new RatPatrol(578, 600, 733)], [new Phaser.Point(809, 464), new Phaser.Point(244, 528)]),
            new Level(4, new Phaser.Point(80, 190), new Phaser.Point(230, 726), 'Friday 11th August 4:48 pm', [new RatPatrol(546, 336, 711), new RatPatrol(647, 710, 1070)], [new Phaser.Point(1243, 448), new Phaser.Point(470, 576)])
        ];

        this.startLevel(0);
        this.game.camera.follow(this.hero);

        this.retryKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);

        this.game.input.onDown.add(function () {
            console.log('X = ' + this.game.input.activePointer.worldX);
            console.log('Y = ' + this.game.input.activePointer.worldY);
        }, this);
    }

    private startLevel(levelNum: number)
    {
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
            SoundManager.instance.send(SoundManager.DoorClose);

            const endOfGameTween = this.game.add.tween(this.transitionText).to( { alpha: 1 }, 10000, "Linear", true);

            endOfGameTween.onComplete.addOnce(
                function(){
                    window.location.reload(true);
                }.bind(this));
            return;
        }

        // next level
        const level = this.levels[this.levelNumber];

        // Launc day sound
        SoundManager.instance.send(SoundManager.AmbientDay);

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
        this.map = this.game.add.tilemap('level'+level.getNum());
        this.map.addTilesetImage('tiles-1');
        this.map.setCollision(
            [
                1, 2, 3, 4, 5, 6, 7,
                12, 13, 17,
                21, 22, 23, 24, 25, 26, 27,
                32, 33,
                42, // box
                71 // under ladder
            ]
        );

        this.layer = this.map.createLayer('Tile Layer 1', 1280, 800, this.groundLayer);
        if (this.debug) {
            this.layer.debug = true;
        }
        this.layer.resizeWorld();
        this.game.physics.arcade.gravity.y = 350;

        this.box = new Box(this.dayLayer, level.getBoxPosition().x, level.getBoxPosition().y, 'box', 0);
        this.door = new Door(this.dayLayer, this.nightLayer, level.getDoorPosition().x, level.getDoorPosition().y, 'door', 0);

        level.getRatPatrols().map(function (patrol: RatPatrol) {
            this.rats.push(new Rat(this.dayLayer, this.nightLayer, patrol.fromX, patrol.fromY, patrol.toX, 'rat', 0));
        }.bind(this));

        level.getTerminalPositions().map(function (position: Phaser.Point) {
            this.terminals.push(new Terminal(this.dayLayer, this.nightLayer, position.x, position.y, 'terminal', 0));
        }.bind(this));

        this.hero = new Hero(this.dayLayer, this.nightLayer, level.getStartPosition().x, level.getStartPosition().y, 'lionel', 0, this.game.input.keyboard);
        this.colleague = new Colleague(this.dayLayer, level.getColleaguePosition().x, level.getColleaguePosition().y, 'michel', 0);

        // make the level appears
        const duration = 4000;
        this.game.add.tween(this.transitionText).to( { alpha: 0 }, duration, "Linear", true);
        const tween = this.game.add.tween(this.transitionSprite).to( { alpha: 0 }, duration, "Linear", true);

        tween.onComplete.addOnce(
            function(){
                this.blackout = false;
                this.changingLevel = false;
            }.bind(this));
    }

    private killThemAll()
    {
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
        this.rats.map(function(rat: Rat) { rat.destroy(); rat.eyes.destroy(true); });
        this.terminals.map(function(terminal: Terminal) { terminal.destroy(); terminal.screen.destroy(true); });
    }

    public update()
    {
        if (this.retryKey.isDown) {
            this.retryLevel();
        }

        this.game.physics.arcade.collide(this.hero, this.layer, function (hero: Hero, tile) {
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
            SoundManager.instance.send(SoundManager.PickBox);

            this.colleague.switchOffTheLight(function() {
                this.blackoutSprite = this.game.add.sprite(0, 0, 'blackout', 0, this.blackoutLayer);
                this.blackoutSprite.alpha = 1;
                this.blackout = true;
                this.hero.byNight();
                this.door.byNight();
                this.rats.map(function(rat: Rat) {
                    rat.byNight();
                });
                this.terminals.map(function(terminal: Terminal) {
                    terminal.byNight();
                });
                SoundManager.instance.send(SoundManager.Shutdown);
                SoundManager.instance.send(SoundManager.AmbientNight);

                this.retryText = this.game.add.bitmapText(50, 50, 'carrier-command','(Press R to retry this level)', 10);
                this.fadein(this.retryText);

            }.bind(this), this.hero);

        }.bind(this), null, this);

        this.game.physics.arcade.collide(this.hero, this.door, function () {
            if (this.blackout && !this.changingLevel) {
                this.levelNumber++;
                this.startLevel(this.levelNumber)
            }
        }.bind(this), null, this);

        this.game.physics.arcade.collide(this.rats, this.layer);

        this.game.physics.arcade.collide(this.hero, this.rats, function (hero:Hero, rat: Rat) {
            rat.dies();

        }.bind(this), null, this);


        SoundManager.instance.playRandomEvent();
    }

    public retryLevel()
    {
        if (this.blackout) {
            this.startLevel(this.levelNumber);
        }
    }

    public render()
    {
        if (this.debug) {
            this.rats.map(function (rat: Rat) {
                this.game.debug.body(rat);
            }.bind((this)));
            this.game.debug.body(this.hero);
            this.game.debug.body(this.box);
            this.game.debug.body(this.door);
            this.game.debug.body(this.door.nightDoor);
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );
        }
    }

    private fadein(text)
    {
        text.alpha = 0.1;
        this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
    }
}
