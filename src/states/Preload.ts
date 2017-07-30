
export default class Preload extends Phaser.State {

    public preload ()
    {
        this.load.tilemap('intro', 'assets/forrest/intro.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/forrest/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3', 'assets/forrest/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level4', 'assets/forrest/level4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles-1', 'assets/forrest/tiles.png');
        this.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
        this.load.spritesheet('lionel', 'assets/forrest/lionel-big.png', 64, 64);
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

        this.load.audio('walkMetal', 'assets/sounds/metal.wav');
        this.load.audio('walkBeton', 'assets/sounds/beton.wav');
        this.load.audio('walkCarton', 'assets/sounds/carton.wav');
        this.load.audio('shutdown', 'assets/sounds/SHUTDOWN.wav');
        this.load.audio('pickup', 'assets/sounds/PICKUP_BOX.wav');
    }

    public create ()
    {
        this.game.state.start('Menu');
    }
}
