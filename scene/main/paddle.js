// 分离出挡板的属性
var Paddle = function(game) {
    // var image = imageFromPath('paddle.png')
    // var o = {
    //     image: image,
    //     x: 150,
    //     y: 280,
    //     speed: 5,
    // }
    var o = game.imageByName('paddle')
    o.speed = 15
    o.x = 150
    o.y = 280
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    // 判断两个矩形是否相交
    o.collide = function(ball) {
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.w) {
        //         // log('相撞')
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
