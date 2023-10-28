import { BoxCollider, GameObject, RigidBody, RigidBodyType, Sprite, SpriteRenderer, Vector2 } from "angry-pixel";
import { LAYERS } from "../../config/layers";

const speed = 100;

export class WoodenPlate extends GameObject {
    private direction: number = 1;

    protected init(): void {
        this.layer = LAYERS.Foreground;

        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage("image/misc/wooden_plate.png"),
                smooth: false,
            }),
            tiled: new Vector2(3, 1),
            offset: new Vector2(0, 0),
        });

        this.addComponent(BoxCollider, { width: 48, height: 8, physics: true, debug: true, offsetY: 4 });

        this.addComponent(RigidBody, {
            rigidBodyType: RigidBodyType.Kinematic,
        });

        this.transform.scale.set(3, 3);
        this.transform.position.set(1400, -648);
    }

    protected update(): void {
        this.direction = -1;
        this.transform.rotation.degrees += speed * this.timeManager.deltaTime * this.direction;
    }
}
