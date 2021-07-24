import {
    AssetManager,
    BoxCollider,
    GameObject,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    TimeManager,
    Vector2,
} from "angry-pixel";

const between = (value: number, min: number, max: number): boolean => value >= min && value <= max;

export class MovingPlatform extends GameObject {
    private moveSpeed: number = 150;
    private center: Rectangle = new Rectangle(0, 0, 4, 4);
    private spots: Rectangle[];
    private currentSpot: Rectangle;
    private currentSpotIndex: number = 0;

    constructor(spots: Vector2[]) {
        super();

        this.layer = "Platform";
        this.spots = spots.map<Rectangle>((spot: Vector2) => new Rectangle(spot.x - 2, spot.y - 2, 4, 4));

        this.addComponent(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/tileset/tileset.png"),
                        smooth: false,
                        slice: new Rectangle(96, 48, 48, 16),
                    }),
                })
        );

        this.addComponent(() => new BoxCollider({ debug: true, width: 48, height: 2, offsetY: 7 }));
        this.addComponent(
            () => new RigidBody({ rigidBodyType: RigidBodyType.Dynamic, gravity: 0, layersToCollide: [] })
        );

        this.transform.scale.set(3, 3);
    }

    protected start(): void {
        this.currentSpot = this.spots[this.currentSpotIndex];
        this.transform.position = this.currentSpot.center;
        this.center.position = this.transform.position;
    }

    protected update(): void {
        const angle = Math.atan2(
            this.currentSpot.center.y - this.transform.position.y,
            this.currentSpot.center.x - this.transform.position.x
        );

        const direction = new Vector2(Math.cos(angle), Math.sin(angle));

        this.transform.position = Vector2.add(
            new Vector2(),
            this.transform.position,
            Vector2.scale(new Vector2(), direction, this.moveSpeed * TimeManager.deltaTime)
        );

        this.center.position = this.transform.position;

        if (this.center.overlappingRectangle(this.currentSpot)) {
            // this.transform.position = this.currentSpot;
            this.currentSpotIndex++;
            this.currentSpotIndex = this.currentSpotIndex === this.spots.length ? 0 : this.currentSpotIndex;
            this.currentSpot = this.spots[this.currentSpotIndex];
        }
    }
}
