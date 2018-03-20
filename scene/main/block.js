var Block = function(game, position) {
    // position 是 [0, 0] 格式
    var p = position
    // var image = imageFromPath('block.png')
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        lives: p[2] || 1,
        alive: true,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        o.lives --
        if (o.lives < 1) {
            o.alive = false
        }
    }
    // 砖块与球是否碰撞
    o.collide = function(b) {
        // 只有在 block 存活的状态下,才去检测是否碰撞
        if (o.alive) {
            return rectIntersects(o, b) || rectIntersects(b, o)
        }
        return false
    }
    return o
}
