import {
    AssetManager,
    BoxCollider,
    GameObject,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    TimeManager,
    PolygonCollider,
    Vector2,
    BallCollider,
    range,
    EdgeCollider,
} from "angry-pixel";

const speed = 100;

export class WoodenPlate extends GameObject {
    private direction: number = 1;

    protected init(): void {
        this.layer = "Foreground";

        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: AssetManager.getImage("image/misc/wooden_plate.png"),
                smooth: false,
            }),
            tiled: new Vector2(3, 1),
            offset: new Vector2(0, 0),
        });

        this.addComponent(BoxCollider, { width: 48, height: 8, physics: true, debug: true, offsetY: 4 });

        /*this.addComponent(
            () =>
                new PolygonCollider({
                    vertexModel: generateShape(7, 32),
                    debug: true,
                })
        );*/

        // this.addComponent(() => new BallCollider({ radius: 32, physics: true, debug: true, offsetY: 16 }));

        this.addComponent(RigidBody, {
            rigidBodyType: RigidBodyType.Kinematic,
        });

        this.transform.scale.set(3, 3);
        this.transform.position.set(1400, -648);
    }

    protected update(): void {
        // this.direction = this.transform.rotation.degrees >= 360 ? -1 : this.transform.rotation.degrees <= 0 ? 1 : this.direction;
        this.direction = -1;
        this.transform.rotation.degrees += speed * TimeManager.deltaTime * this.direction;
    }
}

const generateShape = (vertices: number, radius: number): Vector2[] =>
    range(1, vertices, 1).map<Vector2>(
        (i: number) =>
            new Vector2(
                Math.cos((i * (2 * Math.PI)) / vertices) * radius,
                Math.sin((i * (2 * Math.PI)) / vertices) * radius
            )
    );
