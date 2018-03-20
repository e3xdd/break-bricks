class GuaScene {
    constructor(game) {
        this.game = game
    }
    // 改造 new GuaScene() 的语法
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {

    }
    update() {

    }
}
