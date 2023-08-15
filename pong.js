/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cw = canvas.width;
let ch = canvas.height;

let gameStarted = false;

let gameStatus = 'resume';

let a;
let gameSpeed = 2, count = 0;
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("player 2 : (left side)", 200, 400);
        ctx.fillText("player 1 : (right side)   ", 200, 100);
        ctx.fillStyle = "white";
        ctx.fillText("\n z : move up           --        s : move down\n\n  ", 250, 500);
        ctx.fillText(" \n UpArrow : move up      --       DownArrow : move down\n\n  ", 250, 200);
        ctx.fillStyle = "green";
        ctx.fillText(" ! Click anywhere to begin !", 700, 700);
            ctx.fillStyle = "white";
        ctx.fillText(" (! You can use space button to pause/resume !)", 550, 760);
let ball =
{
    x: cw / 2 - 10,
    y: ch / 2 - 10,
    width: 20,
    height: 20,
    dx: -1,
    dy: 1,
    draw()
    {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    delete()
    {
         ctx.clearRect(this.x, this.y, this.width, this.height);
    },
    move()
    {
        a = setInterval(() =>
        {
            if (gameStatus=='resume') {
                count++;
                ctx.clearRect(0, 0, cw, ch);
                paddles.forEach((e) => {
                    e.draw();
                    e.updateScore();
                         })
                ball.x += ball.dx;
                ball.y += ball.dy;
                ball.draw();

                //hit paddle 1
                if (ball.x + 20 == paddle1.x && Math.abs((ball.y + 10) - (paddle1.y + 50)) <= 60) {
                    ball.dx = -ball.dx;
                    paddle1.score++;
                }
                //hit paddle 2
                if (ball.x - 20 == paddle2.x && Math.abs((ball.y + 10) - (paddle2.y + 50)) <= 60) {
                    ball.dx = -ball.dx;
                    paddle2.score++;
                }
                //hit top bottom walls
                if (ball.y == 30 || ball.y + 20 == ch - 20) {
                    ball.dy = -ball.dy;
                }
                // left lose
                if (ball.x < 10)
                {
                    alert("Player 1 wins the game ");
                    window.location.reload();
                }
                // right lose
                if (ball.x > cw-20)
                {
                    alert("Player 2 wins the game ");
                    window.location.reload();
                }
                
            }
          },1)
    }
}
class Paddle
{
    constructor(e)
    {
        this.x =e.x;
        this.y =e.y;
        this.width = 15;
        this.height = 100;
        this.score = 0;
        this.sp = e.sp;
        this.player = e.player;
    }
    draw()
    {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    delete()
    {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    updateScore()
    {
        ctx.font = "55px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.player+this.score, this.sp, 100);
    }
}

let paddle2 = new Paddle({ x: 20, y: ch / 2 - 50,sp:cw/4-200,player:"player 2 : " }), paddle1 = new Paddle({ x: cw - 30, y: ch / 2 - 50,sp:cw-600,player:"player 1 : " });
let paddles = [paddle1, paddle2];



document.addEventListener("keydown", (e) =>
{   
    if (!gameStarted) return;
      if(e.keyCode== 40 )
      {
          if (paddle1.y+100 > ch - 30) return;
                paddle1.delete();
                paddle1.y += 20;
                paddle1.draw();
            }
        if(e.keyCode== 83 )
        {
             if (paddle2.y+100 > ch - 30) return;
                paddle2.delete();
                paddle2.y += 20;
                paddle2.draw();
            }
    if (e.keyCode == 38)
    {
         if (paddle1.y < 30) return;
            paddle1.delete();
            paddle1.y -= 20;
            paddle1.draw();
        }
    if (e.keyCode == 90)
    {
        if (paddle2.y < 30) return;
            paddle2.delete();
            paddle2.y -= 20;
            paddle2.draw();
    }
    if (e.keyCode == 32)
    {
        if (gameStatus == 'paused')
            gameStatus = 'resume';
        else
            gameStatus = 'paused'; 
    }      
})

       

canvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, cw, ch);
    ball.draw();

paddles.forEach((e) => {
    e.draw();
    e.updateScore();
})
    gameStarted = true;
     ball.move();
})