import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

type Props = {
  value: number;
  initialCount?: number;
};

export default function DataBaseCountNumber({ value }: Props) {
  const countupRef = useRef(null);
  const isInView = useInView(countupRef);

  let countUpAnim;

  async function initCountUp() {
    if (!countupRef.current) return;

    const countUpModule = await import('countup.js');
    countUpAnim = new countUpModule.CountUp(countupRef.current, value);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  useEffect(() => {
    if (isInView) {
      initCountUp();
    }
  }, [isInView]);

  return (
    <p className="flex items-center justify-center text-5xl font-bold md:text-14 xl:text-20">
      <span ref={countupRef} className="font-roboto tabular-nums"></span>
      <span className="mb-2">+</span>
    </p>
  );
}
