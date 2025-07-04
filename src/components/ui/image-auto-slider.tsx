import React from 'react';
import Image from 'next/image';

export const Component = () => {
  // Portrait images for the infinite scroll - better suited for TwinkleFace
  const images = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face", 
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=400&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=300&fit=crop&crop=face"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full bg-gray-800/50 border border-gray-700">
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          overflow: hidden;
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
      `}</style>
      
      {/* Debug text */}
      <div className="text-white text-center py-2">Auto Slider Component</div>
      
      {/* Scrolling images container */}
      <div className="relative w-full py-8 overflow-hidden">
        <div className="scroll-container w-full overflow-hidden">
          <div className="infinite-scroll flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={image}
                  alt={`Portrait style ${(index % images.length) + 1}`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
