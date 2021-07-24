import { GameCamera, PhysicsComponent, TYPE_TILED_RENDERER, TYPE_TILEMAP_RENDERER } from "angry-pixel";
import { TilemapRenderer } from "angry-pixel/lib/Engine/Components/Renderer/TilemapRenderer";
import { Foreground } from "../../GameObject/Foreground";
import { Player } from "../../GameObject/Player";

export class FollowPlayerCamera extends PhysicsComponent {
    private player: Player;
    private camera: GameCamera;

    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;

    protected start(): void {
        this.player = this.findGameObjectByName<Player>("Player");
        this.camera = this.gameObject as GameCamera;

        const foreground: Foreground = this.findGameObjectByName<Foreground>("Foreground");

        const tilemapRenderer: TilemapRenderer = foreground.getComponentByType<TilemapRenderer>(TYPE_TILED_RENDERER);
        this.minX = foreground.transform.position.x; // - tilemapRenderer.realWidth / 2;
        this.maxX = foreground.transform.position.x + tilemapRenderer.realWidth; // / 2;
        this.maxY = foreground.transform.position.y; // - tilemapRenderer.realHeight / 2;
        this.minY = foreground.transform.position.y - tilemapRenderer.realHeight; // / 2;
    }

    protected update(): void {
        //this.gameObject.transform.position.set(this.player.transform.position.x, this.player.transform.position.y);
        //return;

        this.gameObject.transform.position.x = Math.min(
            Math.max(this.player.transform.position.x, this.minX + this.camera.viewportRect.width / 2),
            this.maxX - this.camera.viewportRect.width / 2
        );
        this.gameObject.transform.position.y = Math.min(
            Math.max(this.player.transform.position.y, this.minY + this.camera.viewportRect.height / 2),
            this.maxY - this.camera.viewportRect.height / 2
        );
    }
}
