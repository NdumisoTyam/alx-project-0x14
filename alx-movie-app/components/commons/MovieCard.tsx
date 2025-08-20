import React from "react";
import Image from "next/image";

export interface MovieCardProps {
  title: string;
  posterPath?: string;
  overview?: string;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  overview,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
  >
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        width={500}
        height={750}
        className="w-full h-auto"
        style={{ objectFit: "cover" }}
      />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {overview && <p className="text-sm text-gray-600">{overview}</p>}
    </div>
  </div>
);

export default MovieCard;