/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>

module GateCrasher {

    export class Player {

        private player: createjs.MovieClip;

        static WALKINGTOGATE = "WalkingToGate";
        static LEAVINGGATE = "LeavingGate";
        static IN = "In";
        static WAIT = "Wait";
        static ATENTRANCE = "atentrance";
        static ATGATE = "atGate";
        static STUCK = "stuck";
        static JUMP1 = "jump1";
        static JUMP2 = "jump2";

        public state: String = Player.ATENTRANCE;

        private velocity = 360;
        private defaultPosition;
        private startwalking;
        private gatePosition;

        constructor(player: createjs.MovieClip, startwalking:number = 0) {
            this.player = player;
            this.defaultPosition = player.y;
            this.player.setBounds(-20, -20, 40, 40);
            this.startwalking = 0;
            this.player.gotoAndStop(0);
        }

        get mc(): createjs.MovieClip {
            return this.player;
        }

        update(event) {
            if (this.state != Player.WAIT) {
                if (this.startwalking < 0)
                    if (this.state == Player.WALKINGTOGATE) {
                        this.player.y += -1 * (event.delta / 1000 * 100); // move 100px / 1000ms
                        if (this.player.y < 320 && this.gatePosition == 0) {
                            this.player.gotoAndStop(1);
                            this.state = Player.ATGATE;
                            return;
                        }
                        if (this.player.y < 320 + (50 * this.gatePosition)) {
                            this.state = Player.WAIT;
                        }
                    }
                if (this.state == Player.LEAVINGGATE) {
                    this.player.y += -1 * (event.delta / 1000 * 150); // move 100px / 1000ms
                    if (this.player.y < 0) {
                        this.state = Player.IN;
                    }
                }
                if (this.state == Player.JUMP1 || this.state == Player.JUMP2) {
                    this.player.y += -1 * (event.delta / 1000 * this.velocity); // move 100px / 1000ms
                    if (this.velocity > 20) {
                        this.velocity = this.velocity - 10;
                    } else {
                        if (this.state == Player.JUMP2) {
                            this.state = Player.LEAVINGGATE;
                            this.player.gotoAndStop(0);
                        }
                    }
                } else {
                    this.startwalking -= 10;
                }
            }
        }

        enter() {
            this.state = Player.ATENTRANCE;
            this.player.y = this.defaultPosition
            this.velocity = 350;
        }

        wait() {
            this.state = Player.WAIT;
        }

        walkToGate(event, index:number) {
            if (this.state == Player.ATENTRANCE || this.state == Player.WAIT) {
                this.state = Player.WALKINGTOGATE;
                this.gatePosition = index;
            }
        }

        jump(event) {
            if (this.state != Player.JUMP2 && this.state != Player.ATENTRANCE) {
                if (this.state == Player.JUMP1) {
                    this.velocity = 360;
                    this.state = Player.JUMP2;
                }
                if (this.state == Player.ATGATE) {
                    this.state = Player.JUMP1;
                }
            }
        }

        stuck() {
            this.state = Player.STUCK;
        }
    }
}

