import { useEffect, useRef } from 'react';

type Cube = {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  horizontalSpeed: number;
};

export default function FallingCubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubes = useRef<Cube[]>([]);
  const animationRef = useRef<number>(null);

  const colors = ['#15CDE2', '#8A56FF', '#0043C1'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 920;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const initCubes = () => {
      const getConfigByScreenWidth = () => {
        const width = window.innerWidth;
        if (width < 768) { // mobile
          return { count: 300, size: 12 };
        } else if (width < 1280) { // tablet
          return { count: 400, size: 15 };
        } else if (width < 1536) { // desktop
          return { count: 700, size: 20 };
        } else { // 2xl screens
          return { count: 1000, size: 20 };
        }
      };

      const { count, size } = getConfigByScreenWidth();
      cubes.current = Array.from({ length: count })
        .fill(0)
        .map(() => ({
          x: Math.random() * canvas.width,
          y: -50,
          size,
          speed: Math.random() * 4 + 2,
          rotation: 0,
          rotationSpeed: (Math.random() * 0.02 - 0.01),
          color: colors[Math.floor(Math.random() * colors.length)],
          horizontalSpeed: Math.random() * 0.6 - 0.3,
        }));
    };
    initCubes();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cubes.current.forEach((cube) => {
        ctx.save();
        ctx.translate(cube.x + cube.size / 2, cube.y + cube.size / 2);
        ctx.rotate(cube.rotation);
        ctx.fillStyle = cube.color;
        ctx.fillRect(-cube.size / 2, -cube.size / 2, cube.size, cube.size);
        ctx.restore();

        cube.y += cube.speed;
        cube.x += cube.horizontalSpeed; // Apply horizontal movement
        cube.rotation += cube.rotationSpeed;

        if (cube.y > canvas.height || cube.x < -50 || cube.x > canvas.width + 50) {
          cube.y = -50;
          cube.x = Math.random() * canvas.width;
          cube.color = colors[Math.floor(Math.random() * colors.length)];
          cube.horizontalSpeed = Math.random() * 0.6 - 0.3; // Reset horizontal speed
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-x-8">
      <div className="col-span-10 col-start-2 xl:col-span-8 xl:col-start-3">
        <div className="relative h-[300px] overflow-x-hidden overflow-y-clip md:h-[550px] xl:h-[780px] 2xl:h-[920px]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10"
          />
        </div>
      </div>
    </div>
  );
}
