import imgBottle from '@/assets/bottle.png?url';
import imgCan from '@/assets/can.png?url';
import imgTube from '@/assets/tube.png?url';
import { wrap } from '@popmotion/popcorn';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

enum ProductId {
  BOTTLE = 'bottle',
  CAN = 'can',
  TUBE = 'tube',
}

type Product = {
  id: ProductId;
  imgUrl: string;
  alt?: string;
  labelPositions: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
};

const productList: Product[] = [
  {
    id: ProductId.BOTTLE,
    imgUrl: imgBottle,
    alt: '瓶裝零售商品文本字詞庫',
    labelPositions: {
      topLeft: '特潤超導修護露',
      topRight: '小棕瓶',
      bottomLeft: '全方位修護露',
      bottomRight: '全方位小棕修護組',
    },
  },
  {
    id: ProductId.CAN,
    imgUrl: imgCan,
    alt: '罐裝零售商品文本字詞庫',
    labelPositions: {
      topLeft: '長效潤澤修護霜',
      topRight: '保濕面霜',
      bottomLeft: '高效保濕水漾乳霜',
      bottomRight: '水活保濕無香特潤凝霜',
    },
  },
  {
    id: ProductId.TUBE,
    imgUrl: imgTube,
    alt: '軟管零售商品文本字詞庫',
    labelPositions: {
      topLeft: '10％果酸身體乳',
      topRight: '美白乳液',
      bottomLeft: '美白潤膚乳液',
      bottomRight: '杏仁酸亮白煥膚身體乳',
    },
  },
];

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.2,
  }),
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.5, // delay each label by 0.3s
    },
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export default function ProductCorpus() {
  const [[productCount, direction], setProductCount] = useState([1, 0]);
  const activeProductIndex = wrap(0, productList.length, productCount);
  const activeProduct = productList[activeProductIndex];
  const [isPaused, setPaused] = useState(false);

  function swipeToProduct(newDirection: number) {
    setProductCount([productCount + newDirection, newDirection]);
  }

  function skipToProduct(newProductIndex: number) {
    const newDirection = newProductIndex > productCount ? 1 : -1;

    setProductCount([newProductIndex, newDirection]);
  }

  // slide every 3 seconds
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // matches md: breakpoint in Tailwind

    if (isMobile && !isPaused) {
      // Carousel timer
      const timer = setInterval(() => {
        swipeToProduct(1);
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [productCount, isPaused]);

  return (
    <>
      {/* mobile: carousel with 3 items */}
      <div
        className="flex flex-col items-center overflow-hidden px-3 md:hidden"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* slider */}
        <div className="relative h-[300px] w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={productCount}
              style={{
                backgroundImage: `url(${productList[activeProductIndex].imgUrl})`,
              }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              className="absolute left-1/4 h-full w-1/2 bg-contain bg-center bg-no-repeat"
            />
          </AnimatePresence>
        </div>

        {/* label */}
        <div className="grid grid-cols-2 justify-center gap-2">
          <Label text={activeProduct.labelPositions?.topLeft} />
          <Label text={activeProduct.labelPositions?.topRight} />
          <Label text={activeProduct.labelPositions?.bottomLeft} />
          <Label text={activeProduct.labelPositions?.bottomRight} />
        </div>
      </div>

      {/* tablet, desktop: horizontal arrangement, the two items in the back are slightly covered on the sides */}
      <div className="hidden gap-x-8 overflow-hidden md:grid md:grid-cols-11 xl:grid-cols-12 2xl:pt-18">
        {/* label left */}
        <div className="md:col-span-3 xl:col-span-3">
          <div className="flex h-full flex-col justify-around">
            {/* top left */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              custom={0}
              className="flex justify-end xl:-mr-10"
            >
              <LabeledConnector
                text={activeProduct.labelPositions?.topLeft}
                lineClassesList={['md:h-5 lg:h-8', 'md:w-24 lg:w-28 xl:w-40']}
              />
            </motion.div>

            {/* bottom left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              custom={1}
              className="flex justify-end xl:pr-4 2xl:pr-0"
            >
              <LabeledConnector
                text={activeProduct.labelPositions?.bottomLeft}
                lineClassesList={[
                  'md:h-5 lg:h-8',
                  'md:w-20 lg:w-[100px] xl:w-36 2xl:w-[180px]',
                ]}
              />
            </motion.div>
          </div>
        </div>

        {/* product group */}
        <div className="relative md:col-span-5 md:col-start-4 xl:col-span-6 xl:col-start-4">
          <div className="flex justify-center md:h-[250px] xl:h-[450px] 2xl:h-[500px]">
            {productList.map((product, index) => {
              // Calculate position based on index
              const positionLeft = 'calc(50%)';
              let translateClasses;

              if (index === 0) {
                translateClasses = '-translate-x-[110%]'; // left position
              } else if (index === 1) {
                translateClasses = '-translate-x-1/2'; // center position
              } else {
                translateClasses = '-translate-x-1/2 md:translate-x-[15%]'; // right position with breakpoints
              }

              return (
                <motion.div
                  key={product.id}
                  className={`absolute bottom-0 flex h-full origin-bottom cursor-pointer items-end transition-all duration-300
                    ${translateClasses}
                    ${
                index === activeProductIndex
                  ? 'z-20'
                  : 'z-10 scale-90 opacity-60 hover:scale-95'
                }`}
                  style={{
                    left: positionLeft,
                    backgroundImage: `url(${product.imgUrl})`,
                    width: '41.666667%',
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                  }}
                  onClick={() => skipToProduct(index)}
                >
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* label right */}
        <div className="md:col-span-3 xl:col-span-3">
          <div className="flex h-full flex-col justify-around">
            {/* top right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              custom={2}
              className="flex xl:pl-10"
            >
              <LabeledConnector
                text={activeProduct.labelPositions?.topRight}
                lineClassesList={['md:h-5 lg:h-8', 'md:w-16 lg:w-[100px]']}
                position="right"
              />
            </motion.div>

            {/* bottom right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariants}
              custom={3}
              className="-ml-10 flex xl:-ml-2 2xl:-ml-10"
            >
              <LabeledConnector
                text={activeProduct.labelPositions?.bottomRight}
                lineClassesList={[
                  'md:h-5 lg:h-8',
                  'md:w-24 lg:w-28 xl:w-[172px]',
                ]}
                position="right"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div className="rounded-full bg-gradient-to-r from-cyan-300 to-purple-400 p-0.5 lg:p-1">
      <p
        className="text-nowrap rounded-full bg-dark px-2.5 py-1 text-center text-sm
                    md:px-6 md:py-2 md:text-base md:font-medium lg:text-xl xl:px-8 xl:py-3 xl:text-[22px] xl:font-bold
                    2xl:px-10 2xl:py-4 2xl:text-8"
      >
        {text}
      </p>
    </div>
  );
}

type LabelLineProps = {
  text: string;
  lineClassesList: string[];
  position?: 'left' | 'right';
};

function LabeledConnector({
  text = '',
  lineClassesList = [],
  position = 'left',
}: LabelLineProps) {
  return (
    <div className="relative">
      <Label text={text} />
      <div className="absolute bottom-0 left-1/2 translate-y-full">
        <div
          className={`h-3 w-0.5 bg-gradient-to-b from-cyan-300 to-purple-400 lg:w-1 ${lineClassesList[0]}`}
        />
        <div
          className={`h-0.5 w-12 -translate-y-full rotate-180 bg-purple-400 lg:h-1 ${
            lineClassesList[1]
          } ${
            position === 'right'
              ? 'flex -translate-x-full  flex-row-reverse'
              : ''
          }`}
        >
          <div
            className={`size-1.5 -translate-y-0.5 rounded-full from-cyan-300 to-purple-400 md:size-2 md:translate-y-[-3px] lg:size-3 lg:-translate-y-1 ${
              position === 'right' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
