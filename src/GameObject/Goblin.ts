import {
    Animator,
    AssetManager,
    BoxCollider,
    CollisionData,
    GameObject,
    InitOptions,
    Rectangle,
    RigidBody,
    RigidBodyType,
    Sprite,
    SpriteRenderer,
    Vector2,
} from "angry-pixel";
import { Enemy01Walking } from "../animation/Enemy01Animations";
import { LAYERS } from "../config/layers";

export interface EnemyOptions extends InitOptions {
    position: Vector2;
    walkSpeed: number;
}

export class Goblin extends GameObject {
    private spriteRenderer: SpriteRenderer;
    private animator: Animator;
    private bodyCollider: BoxCollider;
    private edgeCollider: BoxCollider;

    private walkSpeed: number = 96;
    private readonly jumpSpeed: number = 840;

    private jumping: boolean = true;
    private cacheVelocity = new Vector2();

    private bodyCollisions: CollisionData[];
    private bodyCollision: boolean = false;
    private edgeCollision: boolean = false;
    private wallCollision: boolean = false;
    private playerCollision: boolean = false;

    protected init({ position, walkSpeed }: EnemyOptions): void {
        this.layer = LAYERS.Goblin;

        this.spriteRenderer = this.addComponent<SpriteRenderer>(SpriteRenderer, {
            sprite: new Sprite({
                image: AssetManager.getImage("image/enemy/goblin_spritesheet.png"),
                slice: new Rectangle(0, 0, 16, 16),
                smooth: false,
            }),
        });

        this.animator = this.addComponent<Animator>(Animator, {
            spriteRenderer: this.spriteRenderer,
        }).addAnimation(Enemy01Walking(), "Walking");

        this.bodyCollider = this.addComponent(
            BoxCollider,
            { width: 10, height: 16, physics: true, debug: true },
            "BodyCollider"
        );

        this.edgeCollider = this.addComponent(
            BoxCollider,
            { width: 4, height: 4, offsetX: 8, offsetY: -10, physics: false, debug: true },
            "EdgeCollider"
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
        this.bodyCollisions = this.bodyCollider.getCollisionsWithLayer(LAYERS.Foreground);
        this.bodyCollision = this.bodyCollisions.length > 0;

        this.edgeCollision = this.edgeCollider.collidesWithLayer(LAYERS.Foreground);
        this.playerCollision = this.edgeCollider.collidesWithLayer(LAYERS.Player);
        this.wallCollision = this.bodyCollision && this.bodyCollisions.some((c) => c.resolution.direction.x !== 0);

        let yVelocity: number = this.bodyCollision ? 0 : this.rigidBody.velocity.y;

        if ((!this.edgeCollision || this.wallCollision) && this.bodyCollision) {
            this.transform.scale.x *= -1;
        }

        if (this.playerCollision && this.jumping === false) {
            this.jumping = true;
            yVelocity = this.jumpSpeed;
        }

        if (this.playerCollision === false) {
            this.jumping = false;
        }

        this.cacheVelocity.set(Math.sign(this.transform.scale.x) * this.walkSpeed, yVelocity);
        this.rigidBody.velocity = this.cacheVelocity;
    }
}
