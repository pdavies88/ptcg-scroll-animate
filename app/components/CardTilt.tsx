'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const reverseType = (supertype: string) => {
  switch (supertype) {
    case 'Energy':
      return 'reverse-energy';
    case 'Trainer':
      return 'reverse-trainer';
    default:
      return 'reverse-pokemon';
  }
};

const TiltCard = ({
  name,
  image,
  rarity,
  supertype,
}: {
  name: string;
  image: string;
  rarity: string;
  supertype: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  );

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target as HTMLElement;
    const rect = element.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(true);
      setIsAnimating(true);
    }
  }

  function zoom() {
    if (!divRef.current?.classList.contains('zoom')) {
      divRef.current?.classList.add('zoom');
    } else {
      divRef.current?.classList.remove('zoom');
    }
  }

  return (
    <div
      ref={divRef}
      onClick={() => {
        if (!isFlipped) {
          handleFlip();
        } else {
          zoom();
        }
      }}
      className='flex justify-center'
    >
      <motion.div
        className='flip-card-inner w-[245px] h-[342px] cursor-pointer'
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, animationDirection: 'normal' }}
        onAnimationComplete={() => {
          setIsAnimating(false);
        }}
      >
        <Image
          src={`/card_back.png`}
          alt='Pokemon Card Back'
          height={342}
          width={245}
          className='flip-card-front rounded-xl'
        />
        {isFlipped && (
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d',
            }}
          >
            {(rarity === 'Reverse Holo' ||
              rarity === 'Rare Holo GX' ||
              rarity === 'Rare Ultra' ||
              rarity === 'Rare Rainbow' ||
              rarity === 'Rare Secret') &&
              !isAnimating && <span className='shine' />}
            {rarity === 'Rare Holo' && !isAnimating && (
              <span className='shine-small' />
            )}
            <Image
              src={image}
              alt={name || 'Card Image'}
              height={342}
              width={245}
              className='flip-card-back max-h-[342px] rounded-xl'
            />
            {rarity === 'Reverse Holo' && !isAnimating && (
              <Image
                src={image}
                alt={name || 'Card Image'}
                height={342}
                width={245}
                className={reverseType(supertype)}
                style={{
                  top: 0,
                  position: 'absolute',
                  transform: 'rotateY(180deg)',
                  zIndex: '2',
                }}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
