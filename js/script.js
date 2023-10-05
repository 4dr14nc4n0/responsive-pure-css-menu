
window.onload = function() {

    const canvas =  document.querySelector('#canvas') ;
    
    console.log (canvas);
    
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight ;
    })
    let c = canvas.getContext('2d') ;
    
    
    class Circle {
        constructor(x,y,dx,dy,raduis,color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.raduis = raduis;
            this.color = color ;
        }
        draw() {
            c.beginPath() ;
            c.arc(this.x,this.y,this.raduis,0,Math.PI * 2,false) ;
            c.fillStyle =  this.color ;
            c.fill() ;
            c.closePath() ;
            return this ;
        }
        update() {
           
      
            if((this.x + this.raduis) > window.innerWidth || (this.x - this.raduis < 0)) {
                this.dx = -this.dx ;
            }
            if((this.y + this.raduis) > window.innerHeight || (this.y - this.raduis < 0)) {
                this.dy = -this.dy ;
            }
       
            this.x += this.dx ;
            this.y += this.dy ;
        }
        reverse() {
            if(this.dx > 0 || this.dx < 0 ) {
                this.dx *= -1 ;
            }
            if(this.dy > 0 || this.dy < 0 ) {
                this.dy *= -1 ;
            }
            return this ;
        }
        zoom() {
            this.raduis += 5 ;
        }
    }
    
    
    function getDistance(x1,x2,y1,y2) {
        let distance = Math.sqrt(Math.pow(x2 - x1 ,  2) + Math.pow(y2 - y1 ,2)) ;
        return distance ; 
    }
    
    
    let c2 = new Circle(canvas.width - 40,canvas.height / 2 , 2  , 0 , 40) ;
    
    let  c1 = new Circle(40,canvas.height / 2 , 2 , 0 , 40) ;
    
    let mouse = {
        x: undefined ,
        y: undefined 
    }
    window.addEventListener('mousemove' , event => {  
        mouse.x = event.x ;
        mouse.y = event.y ;
    }) ;
    
    function mouseOverObj(x,y,raduis) {
       return mouse.x - x > 0 && mouse.x - x < raduis && mouse.y - y > 0  && mouse.y - y < raduis ;
    }
    
    let circleArray = [] ;
    
    let colors = [
       '#3F91BF',
        '#38A1BF' ,
        '#88A8BE',
        '#8FA9BF',
        '#4E9BBF',
        '#6EB3BF',
        '#89BF45',
    ]
    for(let i = 0 ; i < 20 ; i++) {
        let raduis = Math.random() * 1000 + 1;
        let x = Math.random() * (window.innerWidth - raduis * 2) + raduis ;
        let y = Math.random() * (window.innerHeight - raduis * 2) + raduis ;
        let dx = Math.random() * 4 ;
        let dy = Math.random() * 4 ;
        let color = colors [Math.floor(Math.random() * colors.length )] ;
        circleArray.push(new Circle(x,y,dx,dy,raduis,color)) ;
    
    }
    
    function animate() {
      let myReq =  requestAnimationFrame(animate) ;
        c.clearRect(0,0,window.innerWidth,window.innerHeight) ;
    
        
         circleArray.forEach(circle => {
             circle.draw().update();
        
         })
    
     
      
    }
    
    animate();

}