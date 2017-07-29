
export class Level
{
    private startPosition: Phaser.Point;

    public constructor(startPosition: Phaser.Point)
    {
        this.startPosition = startPosition;
    }

    public getStartPosition()
    {
        return this.startPosition;
    }
}