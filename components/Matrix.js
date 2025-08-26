import { useEffect, useRef } from 'react';

export default function Matrix() {
  const canvasRef = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const letters = '01';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    let animation = true;

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0,0,width,height);
      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';
      for(let i=0;i<drops.length;i++){
        const text = letters.charAt(Math.floor(Math.random()*letters.length));
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
      if(animation) requestAnimationFrame(draw);
    }
    draw();

    function onResize(){ width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }

    window.addEventListener('resize', onResize);
    return ()=>{ animation=false; window.removeEventListener('resize', onResize); }
  },[]);

  return <canvas ref={canvasRef} className="matrix"></canvas>
}
