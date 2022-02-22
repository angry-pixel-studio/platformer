import { clamp, ComponentTypes, GameCamera, PreRenderComponent, TiledTilemapRenderer, Vector2 } from "angry-pixel";
import { Foreground } from "../../GameObject/Foreground";
import { Player } from "../../GameObject/Player";

const maxOffset = 80;

export class FollowPlayerCamera extends PreRenderComponent {
    private player: Player;
    private camera: GameCamera;

    private boundaries = {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
    };

    private playerOffset: Vector2 = new Vector2();
    private cachePosition: Vector2 = new Vector2();

    start(): void {
        this.player = this.findGameObjectByName<Player>("Player");
        this.camera = this.gameObject as GameCamera;

        const foreground = this.findGameObjectByName<Foreground>("Foreground");
        const tilemapRenderer = foreground.getComponentByType<TiledTilemapRenderer>(
            ComponentTypes.TiledTilemapRenderer
        );

        this.boundaries.minX = foreground.transform.position.x;
        this.boundaries.maxX = foreground.transform.position.x + tilemapRenderer.realWidth;
        this.boundaries.maxY = foreground.transform.position.y;
        this.boundaries.minY = foreground.transform.position.y - tilemapRenderer.realHeight;

        this.cachePosition.copy(this.player.transform.position);
        this.gameObject.transform.position.copy(this.player.transform.position);
    }

    update(): void {
        this.followPlayer();
        this.clampToBoundaries();
    }

    private followPlayer(): void {
        Vector2.subtract(this.playerOffset, this.player.transform.position, this.gameObject.transform.position);

        this.cachePosition.x = this.player.transform.position.x - clamp(this.playerOffset.x, -maxOffset, maxOffset);
        this.cachePosition.y = this.player.transform.position.y - clamp(this.playerOffset.y, -maxOffset, maxOffset);

        this.gameObject.transform.position = this.cachePosition;
    }

    private clampToBoundaries(): void {
        this.gameObject.transform.position.x = clamp(
            this.cachePosition.x,
            this.boundaries.minX + this.camera.viewportRect.width / 2,
            this.boundaries.maxX - this.camera.viewportRect.width / 2
        );
        this.gameObject.transform.position.y = clamp(
            this.cachePosition.y,
            this.boundaries.minY + this.camera.viewportRect.height / 2,
            this.boundaries.maxY - this.camera.viewportRect.height / 2
        );
    }
}
