import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook to detect when an element is in view and trigger animations
 * @param threshold - Percentage of element that needs to be visible (0-1)
 * @param once - Whether to trigger only once or every time element comes into view
 * @returns [ref, isInView] - Ref to attach to element and boolean indicating if in view
 */
export const useAnimateOnScroll = (threshold = 0.1, once = true) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once 
  });

  return [ref, isInView] as const;
};

/**
 * Hook to create a typing animation effect
 * @param text - The full text to animate
 * @param speed - Speed of typing in ms per character
 * @param startDelay - Delay before typing starts in ms
 * @returns The currently visible portion of text
 */
export const useTypingAnimation = (
  text: string, 
  speed = 50,
  startDelay = 0
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    
    // Start delay
    timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

/**
 * Hook to create a mouse parallax effect
 * @param strength - How strong the effect should be (higher = more movement)
 * @returns [ref, [x, y]] - Ref to attach to element and current x,y offsets
 */
export const useMouseParallax = (strength = 0.1) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = ref.getBoundingClientRect();
      
      // Calculate distance from center as a percentage
      const x = (clientX - width / 2) * strength;
      const y = (clientY - height / 2) * strength;
      
      setPosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, strength]);

  return [setRef, position] as const;
};
