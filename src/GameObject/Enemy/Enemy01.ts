import {
    Animator,
    AssetManager,
    BoxCollider,
    GameObject,
    InitOptions,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    Vector2,
} from "angry-pixel";
import { Enemy01Walking } from "../../Animation/Enemy01Animations";

export interface EnemyOptions extends InitOptions {
    position: Vector2;
    walkSpeed: number;
}

export class Enemy01 extends GameObject {
    private spriteRenderer: SpriteRenderer;
    private animator: Animator;
    private bodyCollider: BoxCollider;
    private edgeCollider: BoxCollider;
    private wallCollider: BoxCollider;

    private walkSpeed: number = 96;
    private readonly jumpSpeed: number = 840;

    private jumping: boolean = false;
    private cacheVelocity = new Vector2();

    private bodyCollision: boolean = false;
    private edgeCollision: boolean = false;
    private wallCollision: boolean = false;
    private wallPlayerCollision: boolean = false;

    protected init({ position, walkSpeed }: EnemyOptions): void {
        this.layer = "Enemy";

        this.spriteRenderer = this.addComponent<SpriteRenderer>(SpriteRenderer, {
            sprite: new Sprite({
                image: AssetManager.getImage("image/enemy/goblin_spritesheet.png"),
                slice: new Rectangle(0, 0, 16, 16),
                smooth: false,
            }),
        });

        this.animator = this.addComponent<Animator>(Animator, {
            spriteRenderer: this.spriteRenderer,
        }).addAnimation("Walking", Enemy01Walking());

        this.bodyCollider = this.addComponent(
            BoxCollider,
            { width: 10, height: 16, physics: true, debug: true },
            "BodyCollider"
        );
        this.edgeCollider = this.addComponent(
            BoxCollider,
            { width: 4, height: 4, offsetX: 8, offsetY: -6, physics: false, debug: true },
            "EdgeCollider"
        );
        this.wallCollider = this.addComponent(
            BoxCollider,
            { width: 4, height: 4, offsetX: 8, offsetY: 5, physics: false, debug: true },
            "WallCollider"
        );

        this.addComponent(RigidBody, {
            rigidBodyType: RigidBodyType.Dynamic,
            gravity: 3000,
        });

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
