class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 游戏开始', 100, 100)
    }
    update() {

    }
}

/**
var SceneTitle = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('k', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })

    s.draw = function() {
        // draw labels
        game.context.fillText('按 k 游戏开始', 100, 100)
    }

    s.update = function() {
    }

    return s
}
**/
