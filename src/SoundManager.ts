
declare var $: any;
declare var window: any;

export default class SoundManager {

    private Pd;
    private game;
    static instance: SoundManager;

    static ReceiverInitRoomtone = 'InitRoomtone';
    static ReceiverTexture = 'Texture';
    static ReceiverStartWalk = 'StartWalk';
    static ReceiverStopWalk = 'StopWalk';
    static ReceiverJump = 'Jump';
    static ReceiverLand = 'Land';
    static ReceiverShutdown = 'Shutdown';
    static ReceiverBox = 'Box';
    static ReceiverWin = 'Win';

    static ActionBang = 'bang';
    static FloorBeton = 1;
    static FloorMetal = 2;
    static FloorCarton = 3;
    static FloorWater = 4;

    public currentFloorType;

    public soundWalkBeton;
    public soundWalkMetal;
    public soundWalkCarton;
    public soundWalkWater;

    constructor(game: Phaser.Game) {
        this.Pd = window.Pd;
        this.game = game;
    }

    public init ()
    {
        // $.get('assets/puredata/MAINAMBv1.pd', function(main) {
            // this.Pd.loadPatch(main);
            // this.Pd.start();
        // }.bind(this));

        this.soundWalkMetal = this.game.add.audio('walkMetal');
        this.soundWalkBeton = this.game.add.audio('walkBeton');
        this.soundWalkCarton = this.game.add.audio('walkCarton');
    }

    public send(receiver: String, parameters: any)
    {
        switch (receiver) {
            case SoundManager.ReceiverTexture:
                return this.currentFloorType = parameters[0];
            case SoundManager.ReceiverLand:
                return;
                // switch (this.currentFloorType) {
                //     case SoundManager.FloorBeton:
                //         return this.soundWalkBeton.play();
                //     case SoundManager.FloorMetal:
                //         return this.soundWalkMetal.play();
                //     case SoundManager.FloorCarton:
                //         return this.soundWalkCarton.play();
                //     case SoundManager.FloorWater:
                //     // return this.soundWalkWater.play();
                // }
            case SoundManager.ReceiverStartWalk:
                switch (this.currentFloorType) {
                    case SoundManager.FloorBeton:
                        return this.soundWalkBeton.loopFull();
                    case SoundManager.FloorMetal:
                        return this.soundWalkMetal.loopFull();
                    case SoundManager.FloorCarton:
                        return this.soundWalkCarton.loopFull();
                    case SoundManager.FloorWater:
                        // return this.soundWalkWater.loopFull();
                }
            case SoundManager.ReceiverStopWalk:
                this.soundWalkBeton.stop();
                this.soundWalkMetal.stop();
                this.soundWalkCarton.stop();
                return;
        }

        // this.Pd.send(receiver, parameters);
    }
}
