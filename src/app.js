/// <reference path="../../typings/tsd.d.ts"/>
var GateCrasher;
(function (GateCrasher) {
    var Floor = (function () {
        function Floor(mc) {
            this.mc = mc;
        }
        Floor.prototype.update = function () {
        };
        return Floor;
    })();
    GateCrasher.Floor = Floor;
})(GateCrasher || (GateCrasher = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>
var GateCrasher;
(function (GateCrasher) {
    var Gate = (function () {
        function Gate(dl, dr, cd) {
            this.rotationSpeed = 2;
            this.state = Gate.DOORSCLOSED;
            this.dl = dl;
            this.dr = dr;
            this.cd = cd;
            this.cd.setBounds(-5, -5, 10, 10);
        }
        Gate.prototype.update = function () {
            if (this.state == Gate.DOORSOPENING) {
                var myrotation = -2;
                if (this.dl.rotation > -90) {
                    this.dl.rotation = this.dl.rotation + myrotation;
                    this.cd.rotation = this.cd.rotation + myrotation;
                    this.dr.rotation = this.dr.rotation + -1 * (myrotation);
                }
                else {
                    this.state = Gate.DOORSOPEN;
                }
            }
            if (this.state == Gate.DOORSCLOSING) {
                var myrotation = 2;
                if (this.dl.rotation < 0) {
                    this.dl.rotation = this.dl.rotation + myrotation;
                    this.cd.rotation = this.cd.rotation + myrotation;
                    this.dr.rotation = this.dr.rotation + -1 * (myrotation);
                }
                else {
                    this.state = Gate.DOORSCLOSED;
                }
            }
        };
        Gate.prototype.openDoors = function () {
            if (this.state != Gate.DOORSOPENING) {
                this.state = Gate.DOORSOPENING;
            }
        };
        Gate.prototype.closeDoors = function () {
            if (this.state != Gate.DOORSCLOSING) {
                this.state = Gate.DOORSCLOSING;
            }
        };
        Gate.prototype.stuck = function () {
            this.state = Gate.STUCK;
        };
        Gate.prototype.render = function () {
        };
        Gate.DOORSOPEN = "DoorsOpen";
        Gate.DOORSCLOSED = "DoorsClosed";
        Gate.DOORSOPENING = "DoorsOpening";
        Gate.DOORSCLOSING = "DoorsClosing";
        Gate.STUCK = "DoorsStuck";
        return Gate;
    })();
    GateCrasher.Gate = Gate;
})(GateCrasher || (GateCrasher = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>
var GateCrasher;
(function (GateCrasher) {
    var Player = (function () {
        function Player(player, startwalking) {
            if (startwalking === void 0) { startwalking = 0; }
            this.state = Player.ATENTRANCE;
            this.velocity = 360;
            this.player = player;
            this.defaultPosition = player.y;
            this.player.setBounds(-20, -20, 40, 40);
            this.startwalking = 0;
            this.player.gotoAndStop(0);
        }
        Object.defineProperty(Player.prototype, "mc", {
            get: function () {
                return this.player;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.update = function (event) {
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
                    }
                    else {
                        if (this.state == Player.JUMP2) {
                            this.state = Player.LEAVINGGATE;
                            this.player.gotoAndStop(0);
                        }
                    }
                }
                else {
                    this.startwalking -= 10;
                }
            }
        };
        Player.prototype.enter = function () {
            this.state = Player.ATENTRANCE;
            this.player.y = this.defaultPosition;
            this.velocity = 350;
        };
        Player.prototype.wait = function () {
            this.state = Player.WAIT;
        };
        Player.prototype.walkToGate = function (event, index) {
            if (this.state == Player.ATENTRANCE || this.state == Player.WAIT) {
                this.state = Player.WALKINGTOGATE;
                this.gatePosition = index;
            }
        };
        Player.prototype.jump = function (event) {
            if (this.state != Player.JUMP2 && this.state != Player.ATENTRANCE) {
                if (this.state == Player.JUMP1) {
                    this.velocity = 360;
                    this.state = Player.JUMP2;
                }
                if (this.state == Player.ATGATE) {
                    this.state = Player.JUMP1;
                }
            }
        };
        Player.prototype.stuck = function () {
            this.state = Player.STUCK;
        };
        Player.WALKINGTOGATE = "WalkingToGate";
        Player.LEAVINGGATE = "LeavingGate";
        Player.IN = "In";
        Player.WAIT = "Wait";
        Player.ATENTRANCE = "atentrance";
        Player.ATGATE = "atGate";
        Player.STUCK = "stuck";
        Player.JUMP1 = "jump1";
        Player.JUMP2 = "jump2";
        return Player;
    })();
    GateCrasher.Player = Player;
})(GateCrasher || (GateCrasher = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Gate.ts"/>
var GateCrasher;
(function (GateCrasher) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.players = new Array();
            this.playerQue = new Array();
            this.update = function (event) {
                _this.gate.update();
                for (var i = 0; i < 5; i++) {
                    if (_this.players[i].state == GateCrasher.Player.ATENTRANCE) {
                        _this.players[i].walkToGate(event, _this.playerQue.length);
                        _this.playerQue.push(_this.players[i]);
                    }
                    if (_this.players[i].state == GateCrasher.Player.ATGATE && _this.gate.state == GateCrasher.Gate.DOORSCLOSED) {
                        _this.gate.openDoors();
                        if (_this.activePlayer != null) {
                            _this.activePlayer = _this.players[i];
                        }
                    }
                    if (_this.activePlayer.state == GateCrasher.Player.LEAVINGGATE) {
                        _this.activePlayer = _this.playerQue[0];
                    }
                    if (_this.gate.state == GateCrasher.Gate.DOORSOPEN) {
                        _this.gate.closeDoors();
                    }
                    var isHit = _this.isCollide(_this.players[i].mc.getTransformedBounds(), _this.root.colissionDetector.getTransformedBounds());
                    if (isHit) {
                        _this.gate.stuck();
                        _this.players[i].stuck();
                    }
                    if (_this.players[i].state == GateCrasher.Player.IN) {
                        _this.players[i].enter();
                    }
                    _this.players[i].update(event);
                }
                _this.stage.update();
            };
            this.clickStage = function (event) {
                _this.activePlayer.jump(event);
                console.log(_this.playerQue);
                if (_this.activePlayer.state == GateCrasher.Player.JUMP1) {
                    var leavingPlayer = _this.playerQue.shift();
                    console.log(_this.playerQue);
                    for (var i = 0; i < _this.playerQue.length; i++) {
                        _this.playerQue[i].walkToGate(event, i);
                    }
                }
            };
            this.canvas = document.getElementById("canvas");
            this.root = new lib.GateCrasher();
            this.stage = new createjs.Stage(this.canvas);
            this.stage.addChild(this.root);
            this.startPlayerPosition = new createjs.Point(this.root.player.x, this.root.player.y);
            this.gate = new GateCrasher.Gate(this.root.doorLeft, this.root.doorRight, this.root.colissionDetector);
            this.activePlayer = new GateCrasher.Player(this.root.player);
            this.canvas.addEventListener("click", this.clickStage);
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", this.update);
            // this.bb = new createjs.Shape();
            this.initPlayers();
            this.stage.addChild(this.bb);
        }
        Main.prototype.initPlayers = function () {
            var timediff = 0;
            for (var i = 0; i < 5; i++) {
                var player_mx = new lib.Player();
                player_mx.x = this.startPlayerPosition.x;
                player_mx.y = this.startPlayerPosition.y;
                timediff += Math.floor((Math.random() * 4000) + 1);
                var player = new GateCrasher.Player(player_mx, timediff);
                this.players.push(player);
                this.stage.addChild(player_mx);
            }
        };
        Main.prototype.isCollide = function (a, b) {
            return !(((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width)));
        };
        return Main;
    })();
    GateCrasher.Main = Main;
})(GateCrasher || (GateCrasher = {}));
window.addEventListener("load", onLoad, false);
function onLoad(event) {
    var main = new GateCrasher.Main();
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
//# sourceMappingURL=app.js.map