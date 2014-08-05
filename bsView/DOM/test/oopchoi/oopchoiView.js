/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14. 7. 19
 * Time: 오후 12:56
 * To change this template use File | Settings | File Templates.
 */
bs.cls('Button', function (fn, clsfn, bs) {
    fn.NEW = function (key) {
        this.ID = Math.floor(Math.random() * 10);
        this.label;
        this.width;
        this.height;
        this.fillStyle;
        this.x = 0;
        this.y = 0;
        this.rotation;
        this.alpha;
        this.fontSize;
        this.fontFamily;
        this.fontColor;
        this.lineWidth;
        this.strokeStyle;
        this.fontX = 0;
        this.fontY = 0;

        this.context;
        fn.self = this;

        fn.init();
    }

    fn.destroy = function () {
        this.END();
    }

    fn.self = null;

    // 그리기
    fn.draw = function(){
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.fillStyle;
        this.context.fill();
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.strokeStyle;
        this.context.stroke();

        this.context.beginPath();
        this.context.fillStyle = this.fontColor;
        this.context.fill();
        this.context.font = this.fontSize + 'pt ' + this.fontFamily;
        this.context.fillText(this.label, this.fontX, this.fontY);
    }

    fn.localHandler = function(evt){
        console.log(fn.self.context.getImageData(evt.x, evt.y, 1, 1).data[3]);
        if(fn.self.context.getImageData(evt.x, evt.y, 1, 1).data[3] > 220){
            fn.self.fillStyle = 'orange',
            fn.self.fontColor = 'white',
            fn.self.draw();
        } else {
            fn.self.fillStyle = 'yellow',
            fn.self.fontColor = 'black',
            fn.self.draw();
        }
    }

    fn.init = function(){
        bs.WIN.on('mousedown', fn.localHandler);
    }

    fn.addEventListener = function(type, handler){

    }

    fn.removeEventListener = function(type, handler){

    }

    fn.post = function(){

    }




})