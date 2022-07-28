import { BoxCollider, Component, RigidBody, Vector2, CollisionData } from "angry-pixel";
import { InputController } from "../../GameObject/InputController";

export class Movements extends Component {
    // cache
    private feetCollider: BoxCollider;
    private bodyCollider: BoxCollider;
    private headCollider: BoxCollider;
    private rigidBody: RigidBody;
    private inputController: InputController;

    // config
    private gravity: number = 3000;
    private walkSpeed: number = 320;
    private jumpSpeed: number = 840;

    // state
    public grounded: boolean = false;
    private velocity: Vector2 = new Vector2(0, 0);
    private jumping: boolean = false;
    private platformCollision: CollisionData = null;
    private hillsCollision: CollisionData = null;
    private onMovingPlatform: boolean = false;

    protected start(): void {
        this.bodyCollider = this.getComponent("BodyCollider");
        this.feetCollider = this.getComponent("FeetCollider");
        this.headCollider = this.getComponent("HeadCollider");
        this.rigidBody = this.getComponent(RigidBody);
        this.inputController = this.findGameObject(InputController);

        this.rigidBody.gravity = this.gravity;

        this.gameObject.transform.parentScale = false;
    }

    protected update(): void {
        this.platformCollision = this.feetCollider.getCollisionWithLayer("Platform");
        this.grounded =
            this.feetCollider.collidesWithLayer("Foreground") ||
            this.feetCollider.collidesWithLayer("Hills") ||
            this.feetCollider.collidesWithLayer("Enemy") ||
            this.platformCollision !== null;

        this.hillsCollision = this.bodyCollider.getCollisionWithLayer("Hills");

        this.checkForMovingPlatform();
        this.walk();
        this.jump();

        if (this.headCollider.collidesWithLayer("Foreground")) return;

        this.bodyCollider.height = this.inputController.axis.y < 0 ? 8 : 16;
        this.bodyCollider.offsetY = this.inputController.axis.y < 0 ? -4 : 0;
        this.headCollider.offsetY = this.inputController.axis.y < 0 ? -2 : 6;
    }

    private walk(): void {
        this.velocity.set(
            this.inputController.axis.x * this.walkSpeed * (this.hillsCollision ? 2 : 1),
            this.rigidBody.velocity.y
        );
        this.rigidBody.velocity = this.velocity;
    }

    private jump(): void {
        if (this.grounded === true && this.inputController.jump === true && this.jumping === false) {
            this.jumping = true;
            this.velocity.set(this.rigidBody.velocity.x, this.jumpSpeed);
            this.rigidBody.velocity = this.velocity;
        }

        this.jumping &&= this.inputController.jump;
    }

    private checkForMovingPlatform(): void {
        if (this.platformCollision && !this.onMovingPlatform) {
            this.gameObject.parent = this.platformCollision.gameObject;
            this.onMovingPlatform = true;
            console.log("IN");
        } else if (!this.platformCollision && this.onMovingPlatform) {
            this.gameObject.parent = null;
            this.onMovingPlatform = false;
            console.log("OUT");
        }
    }
}
