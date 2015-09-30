/// <reference path="definitions/easeljs.d.ts" />

declare module lib {

	export class properties implements Object {
		static width: number;
		static height: number;
		static fps: number;
		static color: string;
		static manifest: Object[];
	}

	export class GateCrasher extends createjs.Container {
		static nominalBounds: createjs.Rectangle;
		colissionDetector: ColissionDetector;
		doorRight: DoorRight;
		doorLeft: DoorLeft;
		player: Player;
	}

	export class WaitingSpot extends createjs.Container {
		static nominalBounds: createjs.Rectangle;
	}

	export class Player extends createjs.MovieClip {
		static nominalBounds: createjs.Rectangle;
		shape: createjs.Shape;
		shape_1: createjs.Shape;
	}

	export class DoorRight extends createjs.Container {
		static nominalBounds: createjs.Rectangle;
		shape: createjs.Shape;
	}

	export class DoorLeft extends createjs.Container {
		static nominalBounds: createjs.Rectangle;
		shape: createjs.Shape;
	}

	export class ColissionDetector extends createjs.Container {
		static nominalBounds: createjs.Rectangle;
		shape: createjs.Shape;
	}

}
