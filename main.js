var blocks = []
var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        // position
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var paused = false
// debug 模式
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            paused = !paused
        } else if ('123456789'.includes(k)) {
            // 载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 通过滑条控制 fps
    e('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    // 载入图片完成后执行回调,初始化 scene,初始化后 run game
    var game = GuaGame.instance(30, images, function(game){
        var s = SceneTitle.new(game)
        game.runWithScene(s)
    })

    // debug 模式开启
    enableDebugMode(game, true)
}

__main()
