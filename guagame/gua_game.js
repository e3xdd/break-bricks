class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')

        // events
        // 这里可能有一个 this 的指向问题 用 self 来接一下
        var self = this
        window.addEventListener('keydown', function(event) {
            var k = event.key
            self.keydowns[k] = true
        })
        window.addEventListener('keyup', function(event) {
            var k = event.key
            self.keydowns[k] = false
        })
        this.init()
    }

    // 单例
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    
    // drawImage
    drawImage(guaImage) {
        this.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    // clear
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // update
    update() {
        this.scene.update()
    }

    // draw
    draw() {
        this.scene.draw()
    }

    // 注册事件(按键按下时要执行的函数注册进 actions 中)
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        // log(window.fps)
        // events
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下,调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.clear()
        // draw
        g.draw()
        // next run loop
        setTimeout(function() {
            g.runloop(fps)
        }, 1000/window.fps)
    }

    init() {
        var g = this
        // 定义一个空数组来记录图片加载情况
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                loads.push(1)
                log('load images', loads.length, names.length)
                // 所有图片都载入成功后,调用 g.__run
                if (loads.length == names.length) {
                    log('loads done', g.images)
                    g.__start(g)
                }
            }
        }
    }

    imageByName(name) {
        var g = this
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function() {
            g.runloop()
        }, 1000/fps)
    }

    replaceScene(scene) {
        var g = this
        g.scene = scene
    }

    __start(g) {
        this.runCallback(g)
    }
}

/*
var GuaGame = function(fps, images, runCallback) {
    // images 是一个对象,里面是图片的名字和图片的引用路径 images: {paddle: 'paddle.png',}
    // 程序会在所有图片载入成功后才开始运行
    var g = {
        // 例如 actions: {'a': paddle.moveLeft()}
        actions: {},
        // 例如 keydowns: {'a': true}
        keydowns: {},
        images: {},
        scene: null,
    }
    var canvas = e('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // clear
    g.clear = function() {
        g.context.clearRect(0, 0, canvas.width, canvas.height)
    }
    // draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        var k = event.key
        g.keydowns[k] = true
    })
    window.addEventListener('keyup', function(event) {
        var k = event.key
        g.keydowns[k] = false
    })
    // 注册事件(按键按下时要执行的函数注册进 actions 中)
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
    // 将 fps 设置为全局的
    window.fps = 30
    // 在程序运行过程中动态地改变帧率
    var runloop = function() {
        // log(window.fps)
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下,调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.clear()
        // draw
        g.draw()
        // next run loop
        setTimeout(function() {
            runloop(fps)
        }, 1000/window.fps)
    }

    // 定义一个空数组来记录图片加载情况
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            loads.push(1)
            log('load images', loads.length, names.length)
            // 所有图片都载入成功后,调用 g.__run
            if (loads.length == names.length) {
                log('loads done', g.images)
                g.__start()
            }
        }
    }

    g.imageByName = function(name) {
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    g.runWithScene = function(scene) {
        g.scene = scene
        // 开始运行程序
        setTimeout(function() {
            runloop()
        }, 1000/fps)
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }

    g.__start = function() {
        runCallback(g)
    }
    return g
}
*/
