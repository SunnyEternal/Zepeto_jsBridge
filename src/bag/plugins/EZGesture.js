// 手势框
// 不要给drop图片加transition:all .2s;
(function(){
    function preventEventPropagation(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    }

    function gestureTouchStart(evt) {
        var touches = evt.touches || evt.originalEvent.touches;
        var touch = touches[0];
        var offset = {
            'x': touch.pageX,
            'y': touch.pageY
        };
        if (touches.length >= 2) {
            var touch2 = touches[1];
            var offset2 = {
                'x': touch2.pageX,
                'y': touch2.pageY
            };
            this.gesturePinchStart([offset, offset2]);
        } else {
            this.gesturePanStart(offset);
        }

        return preventEventPropagation(evt);
    }
    function gestureTouchMove(evt) {
        var touches = evt.touches || evt.originalEvent.touches;
        var touch = touches[0];
        var offset = {
            'x': touch.pageX,
            'y': touch.pageY
        };
        if (touches.length >= 2) {
            var touch2 = touches[1];
            var offset2 = {
                'x': touch2.pageX,
                'y': touch2.pageY
            };
            this.gesturePinchChange([offset, offset2]);
        } else {
            this.gesturePanMove(offset);
        }

        return preventEventPropagation(evt);
    }
    function gestureTouchEnd(evt) {
        this.gesturePanEnd();
        this.gesturePinchEnd();

        return preventEventPropagation(evt);
    }

    function gestureMouseDown(evt) {
        var offset = {
            'x': evt.pageX,
            'y': evt.pageY
        };
        this.gesturePanStart(offset);

        return preventEventPropagation(evt);
    }
    function gestureMouseMove(evt) {
        var offset = {
            'x': evt.pageX,
            'y': evt.pageY
        };
        this.gesturePanMove(offset);

        return preventEventPropagation(evt);
    }
    function gestureMouseUp(evt) {
        this.gesturePanEnd();

        return preventEventPropagation(evt);
    }

    function gesturePanStart(offset) {
        this.gesturePinchEnabled = false;

        this.gesturePanFrom = offset;

        this.gesturePanOrigin.x = this.targetDom.offsetLeft;
        this.gesturePanOrigin.y = this.targetDom.offsetTop;

        this.gesturePanEnabled = true;

        return false;
    }
    function gesturePanMove(offset) {
        if (this.gesturePanEnabled) {
            var targetOriginX = this.gesturePanOrigin.x + offset.x - this.gesturePanFrom.x;
            var targetOriginY = this.gesturePanOrigin.y + offset.y - this.gesturePanFrom.y;

            this.targetDom.style.left = [targetOriginX, 'px'].join('');
            this.targetDom.style.top = [targetOriginY, 'px'].join('');
        }
        return false;
    }
    function gesturePanEnd() {
        if (this.gesturePanEnabled) {
            var targetOriginX = this.targetDom.offsetLeft;
            var targetOriginY = this.targetDom.offsetTop;

            if (targetOriginX > 0) {
                targetOriginX = 0;
            } else {
                var targetWidth = this.targetDom.offsetWidth;
                var containerWidth = this.containerDom.clientWidth;

                if ((targetOriginX + targetWidth) < containerWidth) {
                    targetOriginX = containerWidth - targetWidth;
                }
            }

            if (targetOriginY > 0) {
                targetOriginY = 0;
            } else {
                var targetHeight = this.targetDom.offsetHeight;
                var containerHeight = this.containerDom.clientHeight;

                if ((targetOriginY + targetHeight) < containerHeight) {
                    targetOriginY = containerHeight - targetHeight;
                }
            }

            this.targetDom.style.left = [targetOriginX, 'px'].join('');
            this.targetDom.style.top = [targetOriginY, 'px'].join('');

            this.gesturePanEnabled = false;
        }

        return false;
    }

    function gesturePinchStart(offsets) {
        this.gesturePanEnabled = false;

        var distanceX = Math.abs(offsets[1].x - offsets[0].x);
        var distanceY = Math.abs(offsets[1].y - offsets[0].y);
        this.gesturePinchFrom = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (this.gesturePinchFrom > 0) {
            var targetRect = this.targetDom.getBoundingClientRect();
            var centerX = (offsets[0].x + offsets[1].x) * 0.5 - targetRect.left;
            var centerY = (offsets[0].y + offsets[1].y) * 0.5 - targetRect.top;

            this.gesturePinchOrigin.x = centerX / this.targetDom.offsetWidth;
            this.gesturePinchOrigin.y = centerY / this.targetDom.offsetHeight;

            this.gesturePinchSize.width = this.targetDom.offsetWidth;
            this.gesturePinchSize.height = this.targetDom.offsetHeight;

            this.gesturePinchEnabled = true;
        }

        return false;
    }
    function gesturePinchChange(offsets) {
        if (this.gesturePinchEnabled) {
            var distanceX = Math.abs(offsets[1].x - offsets[0].x);
            var distanceY = Math.abs(offsets[1].y - offsets[0].y);
            var gesturePinchTo = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            var scale = gesturePinchTo / this.gesturePinchFrom;
            var targetWidth = this.gesturePinchSize.width * scale;
            var targetHeight = this.gesturePinchSize.height * scale;

            var containerRect = this.containerDom.getBoundingClientRect();
            var centerX = (offsets[0].x + offsets[1].x) * 0.5 - containerRect.left;
            var centerY = (offsets[0].y + offsets[1].y) * 0.5 - containerRect.top;

            var targetOriginX = centerX - targetWidth * this.gesturePinchOrigin.x;
            var targetOriginY = centerY - targetHeight * this.gesturePinchOrigin.y;

            this.targetDom.style.width = [targetWidth, 'px'].join('');
            this.targetDom.style.height = [targetHeight, 'px'].join('');
            this.targetDom.style.left = [targetOriginX, 'px'].join('');
            this.targetDom.style.top = [targetOriginY, 'px'].join('');
        }

        return false;
    }
    function gesturePinchEnd() {
        if (this.gesturePinchEnabled) {
            var targetWidth = this.targetDom.offsetWidth;
            var targetHeight = this.targetDom.offsetHeight;
            var targetOriginX = this.targetDom.offsetLeft;
            var targetOriginY = this.targetDom.offsetTop;

            if (targetWidth < this.targetMinWidth) {
                targetWidth = this.targetMinWidth;
                targetHeight = 'auto'
            } else if (targetHeight < this.targetMinHeight){
              targetHeight = this.targetMinHeight;
              targetWidth = 'auto'
            }

            if (targetOriginX > 0) {
                targetOriginX = 0;
            } else {
                var containerWidth = this.containerDom.clientWidth;
                if ((targetOriginX + targetWidth) < containerWidth) {
                    targetOriginX = containerWidth - targetWidth;
                }
            }

            if (targetOriginY > 0) {
                targetOriginY = 0;
            } else {
                var containerHeight = this.containerDom.clientHeight;
                if ((targetOriginY + this.targetDom.offsetHeight) < containerHeight) {
                    // targetOriginY = containerHeight - this.targetDom.offsetHeight;
                    targetOriginY = 0
                }
            }

            this.targetDom.style.width = targetWidth == 'auto' ? 'auto' : [targetWidth, 'px'].join('');
            this.targetDom.style.height = targetHeight == 'auto' ? 'auto' : [targetHeight, 'px'].join('');
            this.targetDom.style.left = [targetOriginX, 'px'].join('');
            this.targetDom.style.top = [targetOriginY, 'px'].join('');

            this.gesturePinchEnabled = false;
        }

        return false;
    }

    function bindEvents() {
        var self = this;
        var supportTouch = ('createTouch' in document);
        if (supportTouch) {
            self.containerDom.ontouchstart = function(evt){ self.gestureTouchStart(evt); return preventEventPropagation(evt); };
            self.containerDom.ontouchmove = function(evt){ self.gestureTouchMove(evt); return preventEventPropagation(evt); };
            self.containerDom.ontouchend = function(evt){ self.gestureTouchEnd(evt); return preventEventPropagation(evt); };
            self.containerDom.ontouchcancel = function(evt){ self.gestureTouchEnd(evt); return preventEventPropagation(evt); };
        } else {
            self.containerDom.onmousedown = function(evt){ self.gestureMouseDown(evt); return preventEventPropagation(evt); };
            self.containerDom.onmousemove = function(evt){ self.gestureMouseMove(evt); return preventEventPropagation(evt); };
            self.containerDom.onmouseup = function(evt){ self.gestureMouseUp(evt); return preventEventPropagation(evt); };
            self.containerDom.onmouseout = function(evt){ self.gestureMouseUp(evt); return preventEventPropagation(evt); };
        }
    }
    function unbindEvents() {
        var self = this;
        var supportTouch = ('createTouch' in document);
        if (supportTouch) {
            self.containerDom.ontouchstart = null;
            self.containerDom.ontouchmove = null;
            self.containerDom.ontouchend = null;
        } else {
            self.containerDom.onmousedown = null;
            self.containerDom.onmousemove = null;
            self.containerDom.onmouseup = null;
        }
    }

    var EZGestureClass = function(containerDom, targetDom, opt){
        this.containerDom = containerDom;
        this.targetDom = targetDom;
        this.targetMinWidth = opt ? (opt.targetMinWidth || 0) : 0;
        this.targetMinHeight = opt ? (opt.targetMinHeight || 0) : 0;
        this.gestureMouseEnabled = false;
        this.gesturePanEnabled = false;
        this.gesturePanFrom = {x:0, y:0};
        this.gesturePanOrigin = {x:0, y:0};
        this.gesturePinchEnabled = false;
        this.gesturePinchFrom = 0;
        this.gesturePinchOrigin = {x:0, y:0};
        this.gesturePinchSize = {width:0, height:0};
        console.log('targetDom', this.targetDom.offsetWidth, this.targetDom.offsetHeight, this.targetDom.offsetWidth / this.targetDom.offsetHeight < this.targetMinWidth / this.targetMinHeight);
        this.targetDom.style.width = '100%'
        setTimeout(() => {
          if (this.targetDom.offsetWidth / this.targetDom.offsetHeight < this.targetMinWidth / this.targetMinHeight) {
            this.targetDom.style.height = 'auto';
            this.targetMinWidth = this.targetDom.offsetWidth
            this.targetMinHeight = 0
            this.targetDom.style.width = '100%'
          } else {
            this.targetDom.style.height = '100%';
            this.targetMinHeight = this.targetDom.offsetHeight
            this.targetMinWidth = 0
            this.targetDom.style.width = 'auto'
          }
        }, 30)

        this.bindEvents();
    }
    EZGestureClass.prototype.gestureTouchStart = gestureTouchStart;
    EZGestureClass.prototype.gestureTouchMove = gestureTouchMove;
    EZGestureClass.prototype.gestureTouchEnd = gestureTouchEnd;
    EZGestureClass.prototype.gestureMouseDown = gestureMouseDown;
    EZGestureClass.prototype.gestureMouseMove = gestureMouseMove;
    EZGestureClass.prototype.gestureMouseUp = gestureMouseUp;
    EZGestureClass.prototype.gesturePanStart = gesturePanStart;
    EZGestureClass.prototype.gesturePanMove = gesturePanMove;
    EZGestureClass.prototype.gesturePanEnd = gesturePanEnd;
    EZGestureClass.prototype.gesturePinchStart = gesturePinchStart;
    EZGestureClass.prototype.gesturePinchChange = gesturePinchChange;
    EZGestureClass.prototype.gesturePinchEnd = gesturePinchEnd;
    EZGestureClass.prototype.bindEvents = bindEvents;
    EZGestureClass.prototype.unbindEvents = unbindEvents;

    window.EZGesture = EZGestureClass;
})();
