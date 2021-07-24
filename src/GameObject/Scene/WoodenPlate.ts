import {
    AssetManager,
    BoxCollider,
    GameObject,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    TimeManager,
    Vector2,
} from "angry-pixel";

export class WoodenPlate extends GameObject {
    private direction: number = 1;

    constructor(x: number, y: number) {
        super();

        this.layer = "Foreground";

        this.addComponent(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/misc/wooden_plate.png"),
                        smooth: false,
                    }),
                    tiled: new Vector2(3, 1),
                    offset: new Vector2(0, 0),
                })
        );

        this.addComponent(() => new BoxCollider({ width: 48, height: 8, physics: true, debug: true, offsetY: 4 }));
        this.addComponent(
            () =>
                new RigidBody({
                    rigidBodyType: RigidBodyType.Static,
                    layersToCollide: [],
                })
        );

        this.transform.scale.set(3, 3);
        this.transform.position.set(x, y);
        //this.transform.rotation.degrees = 45;
    }

    protected update(): void {
        this.direction =
            this.transform.rotation.degrees >= 360 ? -1 : this.transform.rotation.degrees <= 0 ? 1 : this.direction;
        this.transform.rotation.degrees += 100 * TimeManager.deltaTime * this.direction;
    }
}
