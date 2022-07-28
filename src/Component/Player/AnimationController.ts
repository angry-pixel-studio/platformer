import { Animator, Component, RigidBody } from "angry-pixel";
import { Movements } from "./Movements";

export class AnimationController extends Component {
    private rigidBody: RigidBody;
    private animator: Animator;
    private movements: Movements;

    protected start(): void {
        this.rigidBody = this.getComponent(RigidBody);
        this.animator = this.getComponent(Animator);
        this.movements = this.getComponent(Movements);
    }

    update(): void {
        this.gameObject.transform.scale.x =
            this.rigidBody.velocity.x !== 0
                ? Math.sign(this.rigidBody.velocity.x) * Math.abs(this.gameObject.transform.scale.x)
                : this.gameObject.transform.scale.x;

        if (this.rigidBody.velocity.x !== 0 && this.movements.grounded) {
            !this.animator.isPlayingAnimation("PlayerRun") ? this.animator.playAnimation("PlayerRun") : null;
        } else {
            !this.animator.isPlayingAnimation("PlayerIdle") ? this.animator.playAnimation("PlayerIdle") : null;
        }
    }
}
