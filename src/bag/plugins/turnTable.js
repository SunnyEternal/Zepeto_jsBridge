/*
 * 多宫格抽奖js
 * 备注：这里的速度是切换样式的间隔时间，即setTimeout(functionName, time)中的time值；
 * 速度值越小，间隔越短，转的越快。
 */
var defaults = {
    selector:     '#lottery',
    width:        3,    // 转盘宽度
    height:       3,    // 转盘高度
    initSpeed:    300,	// 初始转动速度
    speed:        0,	// 当前转动速度
    upStep:       50,   // 加速滚动步长
    upMax:        50,   // 速度上限
    downStep:     50,   // 减速滚动步长
    downMax:      500,  // 减速上限
    waiting:      3000, // 匀速转动时长
    index:        0,    // 初始位置
    target:       7,    // 中奖位置，可通过后台算法来获得，默认值：最便宜的一个奖项或者"谢谢参与"
    isRunning:    false, // 当前是否正在抽奖
    aim:           null, // 获取中奖号，用户可重写该事件，默认随机数字
    beforeRoll:   null, // 抽奖之前的操作，支持用户追加操作
    beforeDown:   null, // 减速之前的操作，支持用户追加操作
    afterStop:    null //结束滚动后的回调函数
};

var lottery = {

    // 初始化用户配置
    init: function (options) {
        this.options = $.extend(true, defaults, options);
        this.options.speed = this.options.initSpeed;
        this.container = $(this.options.selector);
        this._setup();
    },

    // 开始装配转盘
    _setup: function () {

        // 这里为每一个奖项设置一个有序的下标，方便lottery._roll的处理，已经设置的不在进行设置
        // 初始化第一行lottery-group的序列
        for (var i = 0; i < this.options.width; ++i) {
            this.container.find('.group:first .unit:eq(' + i + ')').not('[data-index]').attr('data-index', i);
        }

        // 初始化最后一行lottery-group的序列
        for (var i = lottery._count() - this.options.height + 1, j = 0, len = this.options.width + this.options.height - 2; i >= len; --i, ++j) {
            this.container.find('.group:last .unit:eq(' + j + ')').not('[data-index]').attr('data-index', i);
        }

        // 初始化两侧lottery-group的序列
        for (var i = 1, len = this.options.height - 2; i <= len; ++i) {
            this.container.find('.group:eq(' + i + ') .unit:first').not('[data-index]').attr('data-index', lottery._count() - i);
            this.container.find('.group:eq(' + i + ') .unit:last').not('[data-index]').attr('data-index', this.options.width + i - 1);
        }
        this._enable();
    },

    // 开启抽奖
    _enable: function () {
        this.container.find('.js-start').on('click', this.beforeRoll);
    },

    // 禁用抽奖
    _disable: function () {
        this.container.find('.js-start').off('click');
    },

    // 转盘加速
    _up: function () {
        var _this = this;
        if (_this.options.speed <= _this.options.upMax) {
            _this._constant();
        } else {
            _this.options.speed -= _this.options.upStep;
            _this.upTimer = setTimeout(function () { _this._up(); }, _this.options.speed);
        }
    },

    // 转盘匀速
    _constant: function () {
        var _this = this;
        clearTimeout(_this.upTimer);
        setTimeout(function () { _this.beforeDown(); }, _this.options.waiting);
    },

    // 减速之前的操作，支持用户追加操作（例如：从后台获取中奖号）
    beforeDown: function () {
        var _this = this;
        _this.aim();
        if (_this.options.beforeDown) {
            _this.options.beforeDown.call(_this);
        }
        _this._down();
    },

    // 转盘减速
    _down: function () {
        var _this = this;
        if (_this.options.speed > _this.options.downMax && _this.options.target == _this._index()) {
            _this._stop();
        } else {
            _this.options.speed += _this.options.downStep;
            _this.downTimer = setTimeout(function () { _this._down(); }, _this.options.speed);
        }
    },

    // 转盘停止，还原设置
    _stop: function () {
        var _this = this;
        clearTimeout(_this.downTimer);
        clearTimeout(_this.rollerTimer);
        _this.options.speed = _this.options.initSpeed;
        _this.options.isRunning = false;
        _this._enable();

        if (_this.options.afterStop) {
            _this.options.afterStop.call(_this);
        }
    },

    // 抽奖之前的操作，支持用户追加操作
    beforeRoll: function () {
        var _this = lottery;
        if (_this.options.beforeRoll) {
            _this.options.beforeRoll.call(_this, function () {
                _this._roll();
            });
        }else{
            _this._roll();
        }
    },

    // 转盘滚动
    _roll: function () {
        var _this = this;
        _this._disable();
        _this.container.find('[data-index=' + _this._index() + ']').removeClass("active");
        ++_this.options.index;
        _this.container.find('[data-index=' + _this._index() + ']').addClass("active");
        _this.rollerTimer = setTimeout(function () { _this._roll(); }, _this.options.speed);
        if (!_this.options.isRunning) {
            _this._up();
            _this.options.isRunning = true;
        }
    },

    // 转盘当前格子下标
    _index: function () {
        return this.options.index % this._count();
    },

    // 转盘总格子数
    _count: function () {
        return this.options.width * this.options.height - (this.options.width - 2) * (this.options.height - 2);
    },

    // 获取中奖号，用户可重写该事件，默认随机数字
    aim: function () {
        if (this.options.aim) {
            this.options.aim.call(this);
        } else {
            this.options.target = parseInt(parseInt(Math.random() * 10) * this._count() / 10);
            console.log('中奖号',this.options.target);
        }
    }
};


export default lottery
/*初始化抽奖程序*/
// lottery.init({
// 		width: 3,    // 转盘宽度
// 		height: 4,    // 转盘高度
// 		waiting: 2000 // 匀速转动时长
// });
