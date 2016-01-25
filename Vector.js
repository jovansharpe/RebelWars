var Vector;
(function (Vector) {
    /**
     * Class containing a target location. Has functions to help navigate toward target.
     */
    var Waypoint = (function () {
        function Waypoint(targetX, targetY) {
            this.targetX = targetX;
            this.targetY = targetY;
        }
        /**
         * Returns new waypoint that leads to parent waypoint based on speed
         */
        Waypoint.prototype.getNextLocation = function (currentX, currentY, step) {
            var newX = 0;
            var newY = 0;
            //find the distance to target
            var distance = getDistance(currentX, currentY, this.targetX, this.targetY);
            //check if current step is greater than distance to target
            if (distance <= step) {
                //arrived at target
                newX = this.targetX;
                newY = this.targetY;
            }
            else {
                //get normalized values
                var coords = getNormalizedPoint((this.targetX - currentX), (this.targetY - currentY));
                //find the movement vector for this frame
                newX = coords.targetX * step;
                newY = coords.targetY * step;
                //add normalized step to next location
                newX = currentX + newX;
                newY = currentY + newY;
            }
            return new Waypoint(newX, newY);
        };
        return Waypoint;
    })();
    Vector.Waypoint = Waypoint;
    /**
     * Change length of vector to 1 while retaining its angle
     */
    function getNormalizedPoint(x, y) {
        var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return new Waypoint((x / length), (y / length));
    }
    /**
     * Get distance between two points
     */
    function getDistance(startX, startY, endX, endY) {
        return getQuadratic((startX - endX), (startY - endY));
    }
    /**
     * Solve for quadratic equation
     */
    function getQuadratic(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    /**
     * Get point to intercept a specific target
     */
    function getTargetedWaypoint(startX, startY, targetX, targetY, targetVelocityX, targetVelocityY, projectileSpeed) {
        var aimX = 0;
        var aimY = 0;
        //get difference
        var diffX = startX - targetX;
        var diffY = startY - targetY;
        // Solve for quadratic equation
        var a = Math.pow(targetVelocityX, 2) + Math.pow(targetVelocityY, 2) - Math.pow(projectileSpeed, 2);
        var b = 2 * ((targetVelocityX * diffX) + (targetVelocityY * diffY));
        var c = Math.pow(diffX, 2) + Math.pow(diffY, 2);
        // Solve quadratic
        var ts = solveQuadratic(a, b, c);
        // Find smallest positive solution
        var t0 = ts.targetX;
        var t1 = ts.targetY;
        var t = Math.min(t0, t1);
        if (t < 0)
            t = Math.max(t0, t1);
        if (t > 0) {
            aimX = targetX + targetVelocityX * t;
            aimY = targetY + targetVelocityY * t;
        }
        return new Waypoint(aimX, aimY);
    }
    Vector.getTargetedWaypoint = getTargetedWaypoint;
    /**
     *
     */
    function solveQuadratic(a, b, c) {
        var point = null;
        if (Math.abs(a) < 1e-6) {
            if (Math.abs(b) < 1e-6) {
                point = Math.abs(c) < 1e-6 ? new Waypoint(0, 0) : null;
            }
            else {
                point = new Waypoint(-c / b, -c / b);
            }
        }
        else {
            var disc = b * b - 4 * a * c;
            if (disc >= 0) {
                disc = Math.sqrt(disc);
                a = 2 * a;
                point = new Waypoint((-b - disc) / a, (-b + disc) / a);
            }
        }
        return point;
    }
    /**
     * Create a random waypoint within the passed in params
     */
    function getRandomWaypoint(minLocationX, maxLocationX, minLocationY, maxLocationY) {
        var randomX = GameLogic.getRandomInteger(minLocationX, maxLocationX);
        var randomY = GameLogic.getRandomInteger(minLocationY, maxLocationY);
        return new Waypoint(randomX, randomY);
    }
    Vector.getRandomWaypoint = getRandomWaypoint;
})(Vector || (Vector = {}));
//# sourceMappingURL=Vector.js.map