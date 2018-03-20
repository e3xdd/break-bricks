var Scene = function(game) {
    var s = {
        game: game,
    }

    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    var blocks = loadLevel(game, 1)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#5A9BDC"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数:' + score, 10, 290)
    }

    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
            return
        }
        // 判断 ball 和 paddle 相撞
        if (paddle.collide(ball)) {
            ball.rebouce()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 和 ball 相撞')
                block.kill()
                ball.rebouce()
                // 更新分数
                score += 100
            }
        }
    }

    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'down')
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}
