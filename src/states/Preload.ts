
export default class Preload extends Phaser.State {

    public preload ()
    {
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
        this.load.spritesheet('rat', 'assets/forrest/snake.png', 32, 32);
        this.load.spritesheet('coin', 'assets/forrest/coins.png', 16, 16);
        this.load.image('background', 'assets/forrest/background.png');
        this.load.image('background-day', 'assets/forrest/background-day.png');
        this.load.image('background-night', 'assets/forrest/background-night.png');
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.load.image('blackout', 'assets/blackout.png');

        this.load.audio('land_metal_0', 'assets/sounds/LAND_TOLE04.mp3');
        this.load.audio('land_metal_1', 'assets/sounds/LAND_TOLE01.mp3');
        this.load.audio('land_metal_2', 'assets/sounds/LAND_TOLE02.mp3');
        this.load.audio('land_metal_3', 'assets/sounds/LAND_TOLE03.mp3');

        this.load.audio('land_carton_0', 'assets/sounds/LAND_CARTON04.mp3');
        this.load.audio('land_carton_1', 'assets/sounds/LAND_CARTON01.mp3');
        this.load.audio('land_carton_2', 'assets/sounds/LAND_CARTON02.mp3');
        this.load.audio('land_carton_3', 'assets/sounds/LAND_CARTON03.mp3');

        this.load.audio('land_beton_0', 'assets/sounds/LAND_BETON04.mp3');
        this.load.audio('land_beton_1', 'assets/sounds/LAND_BETON01.mp3');
        this.load.audio('land_beton_2', 'assets/sounds/LAND_BETON02.mp3');
        this.load.audio('land_beton_3', 'assets/sounds/LAND_BETON03.mp3');

        this.load.audio('walkMetal', 'assets/sounds/STEP_TOLE_LOOP.mp3');
        this.load.audio('walkBeton', 'assets/sounds/STEP_BETON_LOOP.mp3');
        this.load.audio('walkCarton', 'assets/sounds/STEP_CARTON_LOOP.mp3');

        this.load.audio('day', 'assets/sounds/AMBDAY.mp3');
        this.load.audio('night', 'assets/sounds/AMBNIGHT.mp3');

        this.load.audio('shutdown', 'assets/sounds/SWITCH_SHUTDOWN.mp3');
        this.load.audio('pickup', 'assets/sounds/PICKUP_BOX.mp3');
        this.load.audio('door', 'assets/sounds/DOOR.mp3');

        this.load.audio('ladder', 'assets/sounds/ECHELLE_MONTE.mp3');

        this.load.audio('event_0', 'assets/sounds/AMB_EVENT01.mp3');
        this.load.audio('event_1', 'assets/sounds/AMB_EVENT02.mp3');
        this.load.audio('event_2', 'assets/sounds/AMB_EVENT03.mp3');
        this.load.audio('event_3', 'assets/sounds/AMB_EVENT04.mp3');
        this.load.audio('event_4', 'assets/sounds/AMB_EVENT05.mp3');
        this.load.audio('event_5', 'assets/sounds/AMB_EVENT06.mp3');
    }

    public create ()
    {
        this.game.state.start('Menu');
    }
}
