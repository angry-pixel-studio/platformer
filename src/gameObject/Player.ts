import {
    Animator,
    BoxCollider,
    GameObject,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    Vector2,
} from "angry-pixel";
import * as Animations from "../animation/NinjaAnimations";
import { AnimationController } from "../component/player/AnimationController";
import { Movements } from "../component/player/Movements";
import { LAYERS } from "../config/layers";

export class Player extends GameObject {
    private spriteRenderer: SpriteRenderer;
    private animator: Animator;
    private movements: Movements;

    public grounded: boolean = false;

    protected init(): void {
        this.layer = LAYERS.Player;

        this.spriteRenderer = this.addComponent<SpriteRenderer>(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage("image/player/player-spritesheet.png"),
                slice: new Rectangle(0, 64, 16, 16),
                smooth: false,
            }),
            offset: new Vector2(0, 0),
        });

        this.animator = this.addComponent<Animator>(Animator, {
            spriteRenderer: this.spriteRenderer,
        })
            .addAnimation(Animations.NinjaIdle(this.assetManager), "PlayerIdle")
            .addAnimation(Animations.NinjaRun(this.assetManager), "PlayerRun");

        this.addComponent(BoxCollider, { width: 8, height: 16, physics: true, debug: true }, "BodyCollider");

        this.addComponent(
            BoxCollider,
            { width: 6, height: 6, offsetY: -6, physics: false, debug: true },
            "FeetCollider"
        );

        this.addComponent(
            BoxCollider,
            { width: 6, height: 4, offsetY: 6, physics: false, debug: true },
            "HeadCollider"
        );

        this.addComponent(RigidBody, {
            rigidBodyType: RigidBodyType.Dynamic,
        });

        this.movements = this.addComponent(Movements);
        this.addComponent(AnimationController);
    }

    protected start(): void {
        this.transform.scale.set(3, 3);
        this.animator.playAnimation("PlayerIdle");
    }

    protected update(): void {
        this.grounded = this.movements.grounded;
    }
}
