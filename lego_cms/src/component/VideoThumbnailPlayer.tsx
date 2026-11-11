'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark, faVideo } from '@fortawesome/free-solid-svg-icons';

interface VideoThumbnailPlayerProps {
  thumbnailUrl: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  title: string;
  height?: string;
  aspectRatio?: string;
  className?: string;
  autoPlayOnStart?: boolean;
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function isDirectVideoFile(url?: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
}

export function isArticleVideo(article: {
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  thumbnail?: string;
}): boolean {
  if (article.mediaType === 'video') return true;
  if (article.videoUrl && article.videoUrl.trim() !== '') return true;
  if (article.thumbnail && isDirectVideoFile(article.thumbnail)) return true;
  return false;
}

export default function VideoThumbnailPlayer({
  thumbnailUrl,
  videoUrl,
  mediaType,
  title,
  height = '250px',
  aspectRatio,
  className = '',
  autoPlayOnStart = true,
}: VideoThumbnailPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Tentukan apakah ini konten video
  const effectiveVideoUrl = videoUrl || (isDirectVideoFile(thumbnailUrl) ? thumbnailUrl : '');
  const isVideo = mediaType === 'video' || !!effectiveVideoUrl;

  const ytId = effectiveVideoUrl ? getYouTubeVideoId(effectiveVideoUrl) : null;

  // Fallback image poster
  let displayCover = thumbnailUrl;
  if (!displayCover && ytId) {
    displayCover = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  if (!displayCover || isDirectVideoFile(displayCover)) {
    displayCover = '/images/placeholder-product.png';
  }

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: aspectRatio ? 'auto' : height,
    aspectRatio: aspectRatio || undefined,
    backgroundColor: '#111',
    overflow: 'hidden',
    borderTopLeftRadius: '0.375rem',
    borderTopRightRadius: '0.375rem',
  };

  // Jika sedang diputar dan memiliki video
  if (isPlaying && isVideo && effectiveVideoUrl) {
    return (
      <div style={containerStyle} className={className}>
        {/* Tombol Stop / Kembali ke cover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(false);
          }}
          className="btn btn-sm btn-dark position-absolute top-0 end-0 m-2 rounded-circle shadow"
          style={{ zIndex: 10, width: '32px', height: '32px', padding: 0 }}
          title="Tutup Video"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <video
            src={effectiveVideoUrl}
            controls
            autoPlay={autoPlayOnStart}
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            Browser Anda tidak mendukung pemutar video.
          </video>
        )}
      </div>
    );
  }

  // Tampilan Cover Thumbnail biasa (dengan overlay play jika video)
  return (
    <div style={containerStyle} className={className}>
      <Image
        src={displayCover}
        alt={title}
        fill
        style={{
          objectFit: 'cover',
        }}
        onError={(e) => {
          e.currentTarget.srcset = '/images/placeholder-product.png';
        }}
      />

      {/* Tombol Play Overlay jika ini artikel video */}
      {isVideo && effectiveVideoUrl && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsPlaying(true);
          }}
          title="Putar Video"
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow-lg mb-2"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#e53e3e',
              color: '#fff',
              fontSize: '1.25rem',
              transition: 'transform 0.2s',
            }}
          >
            <FontAwesomeIcon icon={faPlay} style={{ marginLeft: '4px' }} />
          </div>
          <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill small">
            <FontAwesomeIcon icon={faVideo} className="me-1 text-warning" /> Play Video
          </span>
        </div>
      )}
    </div>
  );
}
