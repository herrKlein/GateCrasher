/// <reference path="../definitions/easeljs.d.ts"/>
/// <reference path="../Gate-Crasher.d.ts"/>

module GateCrasher {

    export class Gate {

        private rotationSpeed = 2;
        public dl: lib.DoorLeft;
        public dr: lib.DoorRight;
        public cd: lib.ColissionDetector;

        static DOORSOPEN = "DoorsOpen";
        static DOORSCLOSED = "DoorsClosed";
        static DOORSOPENING = "DoorsOpening";
        static DOORSCLOSING = "DoorsClosing";
        static STUCK = "DoorsStuck";

        public state: String = Gate.DOORSCLOSED;

        constructor(dl, dr, cd) {
            this.dl = dl;
            this.dr = dr;
            this.cd = cd;
            this.cd.setBounds(-5, -5, 10, 10);
        }

        public update() {
            if (this.state == Gate.DOORSOPENING) {
                var myrotation = -2;
                if (this.dl.rotation > -90) {
                    this.dl.rotation = this.dl.rotation + myrotation;
                    this.cd.rotation = this.cd.rotation + myrotation;
                    this.dr.rotation = this.dr.rotation + -1 * (myrotation);
                } else {
                    this.state = Gate.DOORSOPEN;
                }
            }
            if (this.state == Gate.DOORSCLOSING) {
                var myrotation = 2;
                if (this.dl.rotation < 0) {
                    this.dl.rotation = this.dl.rotation + myrotation;
                    this.cd.rotation = this.cd.rotation + myrotation;
                    this.dr.rotation = this.dr.rotation + -1 * (myrotation);
                } else {
                    this.state = Gate.DOORSCLOSED;
                }
            }
        }

        public openDoors() {
            if (this.state != Gate.DOORSOPENING) {
                this.state = Gate.DOORSOPENING;
            }
        }

        public closeDoors() {
            if (this.state != Gate.DOORSCLOSING) {
                this.state = Gate.DOORSCLOSING;
            }
        }

        public stuck() {
            this.state = Gate.STUCK;
        }

        render() {
        }
    }
}

