let bite = true;       
        let gameOver = false;
        let gameStarted = true;
        let pcArray = [
            {x: 100, y:100, directionX:1, directionY:-1, size:0.5, color:"blue"},
        ];
        
        
        for(let i=1;i<=10;i++)
        {
            let randomColor = Math.random()*360; 
            let color = `hsl(${randomColor}, 100%, 50%)`;
            let X = Math.random()*800;
            let Y = Math.random()*600;
            let Z = Math.random()*(-1)-0.5;
            let Q = Math.random()+0.2;
            let randomSize = (Math.random()+15)*0.01;
            let newPackman = {x: X, y:Y,directionX:Z, directionY:Q, size:randomSize,color: color};
            pcArray.push(newPackman);
        }

        document.addEventListener('keydown', doKeyDown);

        setInterval(update, 170);
        
    
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
              if (gameStarted) 
              {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "black";
                    ctx.font = "40px 'Courier New', Courier, monospace";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText("Press Arrow Keys to Start", canvas.width / 2, canvas.height / 2);
                    return;
                }   // מפסיק לצייר את המשחק עד שהמשחק מתחיל
              if (gameOver)
               {
                    ctx.font = "80px 'Courier New', Courier, monospace";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
                    return; // מפסיק את העדכון של המשחק
                }

            for(let i=0; i<pcArray.length; i++){
                    ctx.save();
                    ctx.translate(pcArray[i].x, pcArray[i].y);

                    pcArray[i].x += 10 * pcArray[i].directionX;
                    pcArray[i].y += 10 * pcArray[i].directionY;

                    if(pcArray[i].x>=canvas.width-(90*pcArray[i].size) || pcArray[i].x<=(90*pcArray[i].size))
                    {
                         pcArray[i].directionX *= -1; 
                    }
                    if(pcArray[i].y>=canvas.height-(90*pcArray[i].size) || pcArray[i].y<=(90*pcArray[i].size))
                    {
                         pcArray[i].directionY *= -1; 
                    }

                    if(pcArray[i].directionX==-1)
                    {
                        ctx.scale(-1,1);
                    }
                    ctx.scale(pcArray[i].size, pcArray[i].size);
                    packman(pcArray[i].color);
                  
                    ctx.restore();
            }
            //---------------------------
            bite = !bite;
            
            pcArray=eating();
             
            if (pcArray.length == 1) //אם נשאר רק פקמן אחד המשחק נגמר
            {
                 gameOver = true;
                 sound.pause();
                 sound2.play();
            }
        }

        function packman(color) {
            ctx.beginPath();
            if (bite) {
                ctx.arc(0, 0, 90, 3 * Math.PI / 180, 357 * Math.PI / 180, false);
            }
            else {
                ctx.arc(0, 0, 90, 45 * Math.PI / 180, 315 * Math.PI / 180, false);
            }
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(4, -45, 12, 0, 2 * Math.PI, false);
            ctx.fillStyle = "black";
            ctx.fill();
            
        }

        function doKeyDown(e) {
        
            if (gameStarted) {
                gameStarted = false; // מתחיל את המשחק
    
                sound.play();
            }
          
            if(e.keyCode == 39){
                pcArray[0].directionX =1;
                pcArray[0].directionY=0;
            } 
            else if(e.keyCode == 37){
                pcArray[0].directionX =-1;
            } 
            else if(e.keyCode == 38){
                pcArray[0].directionY =-1;
                pcArray[0].directionX=0;
            } 
            else if(e.keyCode == 40){
                pcArray[0].directionY =1;
            }
        }
    
       function eating()
        {
            
            for(let i=1;i<pcArray.length;i++)
            {
            const dx = pcArray[0].x - pcArray[i].x;
            const dy = pcArray[0].y - pcArray[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
                
            if (distance < 90 * pcArray[0].size)  { // 90 זה הרדיוס של
                pcArray.splice(i,1); // מסיר את האויב שנאכל
                updateEnemy();
                break; // אוכל רק פעם אחת בכל עדכון
             }
             } 
            return pcArray;
        }

        function muteUnmute()
        {
            
            if(sound.volume==0.0)
                {
                sound.volume=lastVolume;
                sound2.volume=lastVolume;
                unMuteBtn.style.visibility="visible";
                muteBtn.style.visibility="hidden";
                }
                
        else
                {//mute
                sound.volume=0.0;
                sound2.volume=0.0;
                unMuteBtn.style.visibility="hidden";
                muteBtn.style.visibility="visible";
                }
        } 

        function updateEnemy(){// עדכון כמות האויבים
            document.getElementById('enemiesCount').textContent = "Enemies to eat: " + (pcArray.length - 1);
        }

        // Example move function (replace with your actual movement logic)
        function move(direction) {
            switch(direction) {
                case 'up':
                    // Move player up
                    break;
                case 'down':
                    // Move player down
                    break;
                case 'left':
                    // Move player left
                    break;
                case 'right':
                    // Move player right
                    break;
            }
        }

        // Keyboard support
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowUp':
                    move('up');
                    break;
                case 'ArrowDown':
                    move('down');
                    break;
                case 'ArrowLeft':
                    move('left');
                    break;
                case 'ArrowRight':
                    move('right');
                    break;
            }
        });