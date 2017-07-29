
export default class SoundManager {

    private Pd;
    static instance: SoundManager;

    constructor() {
        this.Pd = window.Pd;
    }

    public init ()
    {
        $.get('assets/puredata/maintest.pd', function(main) {
            this.Pd.loadPatch(main);
            this.Pd.start();
        }.bind(this));
    }

    public send(receiver: String, parameters: any)
    {
        this.Pd.send(receiver, parameters);
    }
}
