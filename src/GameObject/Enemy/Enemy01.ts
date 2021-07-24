import {
    Animator,
    AssetManager,
    BoxCollider,
    GameObject,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    Vector2,
} from "angry-pixel";
import { Enemy01Walking } from "../../Animation/Enemy01Animations";

export class Enemy01 extends GameObject {
    private spriteRenderer: SpriteRenderer;
    private animator: Animator;
    private bodyCollider: BoxCollider;
    private edgeCollider: BoxCollider;
    private wallCollider: BoxCollider;
    private rigidBody: RigidBody;

    private walkSpeed: number = 1.6;
    private readonly jumpSpeed: number = 14;

    private jumping: boolean = false;
    private cacheVelocity = new Vector2();

    private bodyCollision: boolean = false;
    private edgeCollision: boolean = false;
    private wallCollision: boolean = false;
    private wallPlayerCollision: boolean = false;

    constructor(position: Vector2, walkSpeed: number = 1.6) {
        super();

        this.layer = "Enemy";

        this.spriteRenderer = this.addComponent<SpriteRenderer>(
            () =>
                new SpriteRenderer({
                    sprite: new Sprite({
                        image: AssetManager.getImage("image/enemy/goblin_spritesheet.png"),
                        slice: new Rectangle(0, 0, 16, 16),
                        smooth: false,
                    }),
                })
        );

        this.animator = this.addComponent<Animator>(
            () =>
                new Animator({
                    spriteRenderer: this.spriteRenderer,
                })
        ).addAnimation("Walking", Enemy01Walking());

        this.bodyCollider = this.addComponent(
            () => new BoxCollider({ width: 10, height: 16, physics: true, debug: true }),
            "BodyCollider"
        );
        this.edgeCollider = this.addComponent(
            () => new BoxCollider({ width: 4, height: 4, offsetX: 8, offsetY: -6, physics: false, debug: true }),
            "EdgeCollider"
        );
        this.wallCollider = this.addComponent(
            () => new BoxCollider({ width: 4, height: 4, offsetX: 8, offsetY: 5, physics: false, debug: true }),
            "WallCollider"
        );

        this.rigidBody = this.addComponent(
            () =>
                new RigidBody({
                    rigidBodyType: RigidBodyType.Dynamic,
                    layersToCollide: ["Foreground", "Player"],
                    gravity: 5,
                })
        );

        this.transform.position = position;
        this.walkSpeed = walkSpeed;
    }

    protected start(): void {
        this.transform.scale.set(3, 3);
        this.animator.playAnimation("Walking");
    }

    protected update(): void {
        this.move();
    }

    private move(): void {
        this.bodyCollision = this.bodyCollider.collidesWithLayer("Foreground");
        this.edgeCollision = this.edgeCollider.collidesWithLayer("Foreground");
        this.wallCollision = this.wallCollider.collidesWithLayer("Foreground");
        this.wallPlayerCollision = this.wallCollider.collidesWithLayer("Player");

        let yVelocity: number = this.bodyCollision ? 0 : this.rigidBody.velocity.y;

        if ((!this.edgeCollision || this.wallCollision) && this.bodyCollision) {
            this.transform.scale.set(-this.transform.scale.x, this.transform.scale.y);
        }

        if (this.wallPlayerCollision && this.jumping === false) {
            this.jumping = true;
            yVelocity = this.jumpSpeed;
        }

        if (this.wallPlayerCollision === false) {
            this.jumping = false;
        }

        this.cacheVelocity.set(Math.sign(this.transform.scale.x) * this.walkSpeed, yVelocity);
        this.rigidBody.velocity = this.cacheVelocity;
    }
}
