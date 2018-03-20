var Ball = function(game) {
    // var image = imageFromPath('ball.png')
    var img = game.imageByName('ball')
    var o = {
        x: 180,
        y: 275,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    o.rebouce = function() {
        o.speedY *= -1
    }
    // 判断一个点是否在矩阵中
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
