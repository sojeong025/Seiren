import { useEffect, useRef } from "react";
import styles from "./CanvasBackground.module.css"

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight),
      cX = width / 2,
      cY = height / 2;

    let fl = 3,
        shapes: { x: number; y: number; z: number }[] = [],
        numShapes=1000;

    for(let i=0;i<numShapes;i++){
      shapes[i] ={
        x : rand(-1000,1000),
        y : rand(-1000,1000),
        z : rand(0,10000)
      }
    }

    if (!ctx) return;
    
    ctx.translate(cX,cY);

    function resetFrame() {
      //ctx.clearRect(-cX, -cY, width, height);
      ctx.fillStyle="rgba(0,0,0,.5)";
      ctx.fillRect(-cX,-cY,width,height);
    }

    function draw() {
      resetFrame();
    }

    function update() {
      ctx.fillStyle="#ffffff";
      for(let i=0;i<numShapes;i++){
        let shape=shapes[i],
            perspective=fl/(fl+shape.z);
        
        ctx.save();
        ctx.translate(shape.x*perspective,shape.y*perspective);
        ctx.scale(perspective,perspective);
        ctx.fillRect(-3,-3,6,6);
        ctx.restore();
        
        shape.z+50;
        if(shape.z>10000){
          shape.z=0;
        }
        
        fl+=.01;
        
        if(fl>500){
          fl=5;
        }
      }
    }

    function loop() {
      draw();
      update();
      window.requestAnimationFrame(loop);
    }

    loop();
  
  }, []);

  return <canvas ref={canvasRef} className={styles.background} />;
}

export default CanvasBackground;
