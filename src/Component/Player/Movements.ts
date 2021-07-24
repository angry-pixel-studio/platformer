import { BoxCollider, Collision, Component, RigidBody, TYPE_RIGIDBODY, Vector2 } from "angry-pixel";
import { InputController } from "../../GameObject/InputController";

export class Movements extends Component {
    // cache
    private feetCollider: BoxCollider;
    private bodyCollider: BoxCollider;
    private headCollider: BoxCollider;
    private rigidBody: RigidBody;
    private inputController: InputController;

    // config
    private gravity: number = 5;
    private walkSpeed: number = 5;
    private jumpSpeed: number = 14;

    // state
    public grounded: boolean = false;
    private velocity: Vector2 = new Vector2(0, 0);
    private jumping: boolean = false;
    private platformCollision: Collision = null;
    private onMovingPlatform: boolean = false;

    protected start(): void {
        this.bodyCollider = this.getComponentByName("BodyCollider");
        this.feetCollider = this.getComponentByName("FeetCollider");
        this.headCollider = this.getComponentByName("HeadCollider");
        this.rigidBody = this.getComponentByType(TYPE_RIGIDBODY);
        this.inputController = this.findGameObjectByName("InputController");

        this.rigidBody.gravity = this.gravity;

        this.gameObject.transform.parentScale = false;
    }

    protected update(): void {
        this.platformCollision = this.feetCollider.getCollisionWithLayer("Platform");
        this.grounded = this.feetCollider.collidesWithLayer("Foreground") || this.platformCollision !== null;

        this.checkForMovingPlatform();
        this.walk();
        this.jump();

        if (this.headCollider.collidesWithLayer("Foreground")) return;

        this.bodyCollider.height = this.inputController.axis.y < 0 ? 8 : 16;
        this.bodyCollider.offsetY = this.inputController.axis.y < 0 ? -4 : 0;
        this.headCollider.offsetY = this.inputController.axis.y < 0 ? -2 : 6;
    }

    private walk(): void {
        this.velocity.set(this.inputController.axis.x * this.walkSpeed, this.rigidBody.velocity.y);
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
        if (this.platformCollision !== null) {
            if (this.onMovingPlatform === false) {
                this.gameObject.parent = this.platformCollision.remoteCollider.gameObject;
            }
            this.onMovingPlatform = true;
        } else {
            if (this.onMovingPlatform === true) {
                this.gameObject.parent = null;
            }
            this.onMovingPlatform = false;
        }
    }
}
