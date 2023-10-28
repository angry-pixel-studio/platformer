import {
    BoxCollider,
    GameObject,
    PhysicsComponent,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    Vector2,
} from "angry-pixel";
import { LAYERS } from "../../config/layers";

export class MovingPlatform extends GameObject {
    protected init({ spots }: { spots: Vector2[] }): void {
        this.layer = LAYERS.Platform;

        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage("image/tileset/tileset.png"),
                smooth: false,
                slice: new Rectangle(96, 48, 48, 16),
            }),
        });

        this.addComponent(BoxCollider, { debug: true, width: 48, height: 2, offsetY: 7 });
        this.addComponent(RigidBody, { rigidBodyType: RigidBodyType.Kinematic });
        this.addComponent(MovingPlatformComponent, { spots });

        this.transform.scale.set(3, 3);
    }
}

class MovingPlatformComponent extends PhysicsComponent {
    private moveSpeed: number = 150;
    private center: Rectangle = new Rectangle(0, 0, 4, 4);
    private spots: Rectangle[];
    private currentSpot: Rectangle;
    private currentSpotIndex: number = 0;

    private direction: Vector2 = new Vector2();
    private velocity: Vector2 = new Vector2();

    protected init({ spots }: { spots: Vector2[] }): void {
        this.spots = spots.map<Rectangle>((spot: Vector2) => new Rectangle(spot.x - 2, spot.y - 2, 4, 4));
    }

    protected start(): void {
        this.currentSpot = this.spots[this.currentSpotIndex];
        this.gameObject.transform.position = this.currentSpot.center;
        this.center.position = this.gameObject.transform.position;
    }

    protected update(): void {
        Vector2.unit(
            this.direction,
            Vector2.subtract(this.direction, this.currentSpot.center, this.gameObject.transform.position)
        );

        Vector2.add(
            this.gameObject.transform.position,
            this.gameObject.transform.position,
            Vector2.scale(this.velocity, this.direction, this.moveSpeed * this.timeManager.physicsDeltaTime)
        );

        this.center.position = this.gameObject.transform.position;

        if (this.center.overlaps(this.currentSpot)) {
            this.gameObject.transform.position = this.currentSpot.center;
            this.currentSpotIndex = (this.currentSpotIndex + 1) % this.spots.length;
            this.currentSpot = this.spots[this.currentSpotIndex];
        }
    }
}
