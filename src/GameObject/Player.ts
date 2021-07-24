import {
    Animator,
    AssetManager,
    BoxCollider,
    Collision,
    GameObject,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    TimeManager,
    Vector2,
} from "angry-pixel";
import * as Animations from "../Animation/PlayerAnimation";
import { Movements } from "../Component/Player/Movements";
import { Stage01 } from "../Scene/Stage01";

export class Player extends GameObject {
    private spriteRenderer: SpriteRenderer;
    private animator: Animator;
    private rigidBody: RigidBody;
    private movements: Movements;

    public grounded: boolean = false;

    constructor(x: number, y: number) {
        super();

        this.layer = "Player";

        this.spriteRenderer = this.addComponent<SpriteRenderer>(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/player/player-spritesheet.png"),
                        slice: new Rectangle(0, 64, 16, 16),
                        smooth: false,
                    }),
                    offset: new Vector2(0, 0),
                })
        );

        this.animator = this.addComponent<Animator>(
            () =>
                new Animator({
                    spriteRenderer: this.spriteRenderer,
                })
        )
            .addAnimation("PlayerIdle", Animations.PlayerIdle())
            .addAnimation("PlayerRun", Animations.PlayerRun());

        this.addComponent(() => new BoxCollider({ width: 8, height: 16, physics: true, debug: true }), "BodyCollider");

        this.addComponent(
            () => new BoxCollider({ width: 6, height: 8, offsetY: -6, physics: false, debug: true }),
            "FeetCollider"
        );

        this.addComponent(
            () => new BoxCollider({ width: 6, height: 4, offsetY: 6, physics: false, debug: true }),
            "HeadCollider"
        );

        this.rigidBody = this.addComponent(
            () =>
                new RigidBody({
                    rigidBodyType: RigidBodyType.Dynamic,
                    layersToCollide: ["Foreground", "Enemy", "Platform"],
                })
        );

        this.movements = this.addComponent(() => new Movements(), "Movements");

        this.transform.position.set(x, y);
    }

    protected start(): void {
        this.transform.scale.set(3, 3);
        //this.transform.position.set(0, -48);
        this.animator.playAnimation("PlayerIdle");
    }

    protected update(): void {
        this.spriteRenderer.setActive(this.getCurrentScene<Stage01>().paused === false);

        this.grounded = this.movements.grounded;

        this.transform.scale.x =
            this.rigidBody.velocity.x !== 0
                ? Math.sign(this.rigidBody.velocity.x) * Math.abs(this.transform.scale.x)
                : this.transform.scale.x;

        this.updateAnimations();
    }

    private updateAnimations(): void {
        if (this.rigidBody.velocity.x !== 0 && this.grounded) {
            this.animator.playAnimation("PlayerRun");
        } else {
            this.animator.playAnimation("PlayerIdle");
        }
    }
}
