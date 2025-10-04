"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  placeholderImages?: string[];
  onImageChange?: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  alt,
  className = "",
  autoPlay = false,
  interval = 3000,
  showControls = true,
  showDots = true,
  showCounter = true,
  placeholderImages = ["/images/Event_Placeholder.png"],
  onImageChange,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const displayImages = useMemo(
    () => (images && images.length > 0 ? images : placeholderImages),
    [images, placeholderImages]
  );

  const nextImage = useCallback(() => {
    const newIndex = (currentImage + 1) % displayImages.length;
    setCurrentImage(newIndex);
    onImageChange?.(newIndex);
  }, [currentImage, displayImages.length, onImageChange]);

  const prevImage = useCallback(() => {
    const newIndex =
      (currentImage - 1 + displayImages.length) % displayImages.length;
    setCurrentImage(newIndex);
    onImageChange?.(newIndex);
  }, [currentImage, displayImages.length, onImageChange]);

  const goToImage = useCallback(
    (index: number) => {
      setCurrentImage(index);
      setIsPlaying(false);
      onImageChange?.(index);
    },
    [onImageChange]
  );

  const toggleSlideshow = useCallback(() => {
    setIsPlaying(!isPlaying);
    setIsPaused(false);
  }, [isPlaying]);

  const pauseSlideshow = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSlideshow = useCallback(() => {
    setIsPaused(false);
  }, []);

  // swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextImage();
      setIsPlaying(false);
    }
    if (distance < -minSwipeDistance) {
      prevImage();
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    if (
      !isPlaying ||
      isPaused ||
      shouldReduceMotion ||
      displayImages.length <= 1
    )
      return;

    const intervalId = setInterval(() => {
      nextImage();
    }, interval);

    return () => clearInterval(intervalId);
  }, [
    isPlaying,
    isPaused,
    nextImage,
    shouldReduceMotion,
    displayImages.length,
    interval,
  ]);

  const imageVariants = {
    enter: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 50,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -50,
    },
  };

  return (
    <motion.div
      className={`relative w-full rounded-md overflow-hidden border border-white/6  shadow-sm group ${className}`}
      whileHover={shouldReduceMotion ? {} : { scale: 1.0 }}
      transition={{ type: "tween", duration: 0.2 }}
      onMouseEnter={pauseSlideshow}
      onMouseLeave={resumeSlideshow}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ background: "linear-gradient(180deg,#0b1220,#0b1220)" }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={displayImages[currentImage]}
          alt={`${alt} - Image ${currentImage + 1}`}
          className="w-full h-full object-contain select-none"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.35,
            ease: "easeOut",
          }}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (placeholderImages.length > 0) {
              target.src = placeholderImages[0];
            }
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* controls */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={() => {
              prevImage();
              setIsPlaying(false);
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center"
            aria-label="Previous image"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              nextImage();
              setIsPlaying(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center"
            aria-label="Next image"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* dots */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToImage(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentImage ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImageSlider;
