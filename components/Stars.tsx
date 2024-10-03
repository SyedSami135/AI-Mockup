import { Star } from 'lucide-react';

const StarRating = ({ rating,size }: { rating: number ,size: number}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const renderStars = () => {
    const stars = [];

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="text-yellow-400" fill="currentColor" size={size} />
      );
    }

    // Half Star
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="text-yellow-400 " size={size} fill="url(#half-gradient)" />
      );
    }

    // Empty Stars
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={size} className="text-gray-300   fill-gray-300"  />
      );
    }

    return stars;
  };

  return (
    <div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" style={{ stopColor: '#FACC15', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'transparent', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex gap-1">
        {renderStars()}
      </div>
    </div>
  );
};

export default StarRating;
