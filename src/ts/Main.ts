/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Gate.ts"/>

module GateCrasher {

    export class Main {
        private canvas:HTMLElement;
        private stage:createjs.Stage;
        private root:lib.GateCrasher;

        private gate:Gate;
        private players: Array<Player> = new Array();

        private playerQue: Array<Player> = new Array();

        private activePlayer:Player;
        private bb: createjs.Shape;
        private startPlayerPosition: createjs.Point;

        constructor() {
            this.canvas = document.getElementById("canvas");
            this.root = new lib.GateCrasher();

            this.stage = new createjs.Stage(this.canvas);
            this.stage.addChild(this.root);

            this.startPlayerPosition = new createjs.Point(this.root.player.x, this.root.player.y);

            this.gate = new Gate(this.root.doorLeft, this.root.doorRight, this.root.colissionDetector);
            this.activePlayer = new Player(this.root.player);

            this.canvas.addEventListener("click", this.clickStage)

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", this.update);

            // this.bb = new createjs.Shape();

            this.initPlayers()

            this.stage.addChild(this.bb)

        }

        initPlayers() {
            var timediff: number = 0;
            for (var i = 0; i < 5; i++) {
                var player_mx: createjs.MovieClip = new lib.Player();
                player_mx.x = this.startPlayerPosition.x;
                player_mx.y = this.startPlayerPosition.y;
                timediff += Math.floor((Math.random() * 4000) + 1);
                var player: Player = new Player(player_mx, timediff);
                this.players.push(player);
                this.stage.addChild(player_mx);
            }
        }

        update = (event) => {

            this.gate.update();

            for (var i = 0; i < 5; i++) {
                if (this.players[i].state == Player.ATENTRANCE) {
                    this.players[i].walkToGate(event, this.playerQue.length);
                    this.playerQue.push(this.players[i]);
                }

                if (this.players[i].state == Player.ATGATE && this.gate.state == Gate.DOORSCLOSED) {
                    this.gate.openDoors();
                    if (this.activePlayer != null) {
                        this.activePlayer = this.players[i];
                    }
                }

                if (this.activePlayer.state == Player.LEAVINGGATE) {
                    this.activePlayer = this.playerQue[0]
                }

                if (this.gate.state == Gate.DOORSOPEN) {
                    this.gate.closeDoors();
                }

                var isHit = this.isCollide(this.players[i].mc.getTransformedBounds(), this.root.colissionDetector.getTransformedBounds())
                if (isHit) {
                    this.gate.stuck();
                    this.players[i].stuck();
                }

                if (this.players[i].state == Player.IN) {
                    this.players[i].enter();
                }
                this.players[i].update(event);
            }

            this.stage.update();
        }

        clickStage = (event) => {
            this.activePlayer.jump(event);
            console.log(this.playerQue);
            if (this.activePlayer.state == Player.JUMP1) {
                var leavingPlayer = this.playerQue.shift();
                console.log(this.playerQue);
                for (var i = 0; i < this.playerQue.length; i++) {
                    this.playerQue[i].walkToGate(event, i);
                }
            }
        }

        private isCollide(a, b) {
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
                );
        }
    }
}

window.addEventListener("load", onLoad, false);
function onLoad(event) {
    var main: GateCrasher.Main = new GateCrasher.Main();
}





/*
this.bb.graphics.clear();
this.bb.graphics.beginStroke("#F00").drawRect(
    this.root.colissionDetector.getTransformedBounds().x,
    this.root.colissionDetector.getTransformedBounds().y,
    this.root.colissionDetector.getTransformedBounds().width,
    this.root.colissionDetector.getTransformedBounds().height);
this.bb.graphics.beginStroke("#F00").drawRect(
    this.root.player.getTransformedBounds().x,
    this.root.player.getTransformedBounds().y,
    this.root.player.getTransformedBounds().width,
    this.root.player.getTransformedBounds().height);
*/