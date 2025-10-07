// src/components/MusicPlayer.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { playlist } from '@/data/playlist';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

// Função utilitária para formatar o tempo (do seu script.js)
const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const MusicPlayer: React.FC = () => {
  const {
    audioRef, isPlaying, isShuffling, isLooping, currentTrack, currentTime, duration, volume, progress,
    togglePlay, nextTrack, prevTrack, loadTrack,
    toggleShuffle, toggleLoop,
    handleProgressChange, handleVolumeChange,
    handleTimeUpdate, handleLoadedMetadata, handleEnded, setIsPlaying
  } = useAudioPlayer(playlist);

  const currentTrackData = playlist[currentTrack];

  return (
    <div className="w-[340px] flex flex-col gap-4 items-center">
      {/* Player Card */}
      <div className="w-full bg-[#f3ebeb] rounded-2xl p-4 shadow-2xl text-center">
        <div className="w-full">
          <Image
            src={currentTrackData?.cover || '/placeholder.png'}
            alt={currentTrackData?.title || 'Capa do Álbum'}
            width={300}
            height={300}
            className="w-full rounded-lg block"
          />
        </div>

        <div className="my-3">
          <h2 className="text-lg font-bold truncate">{currentTrackData?.title}</h2>
          <p className="text-sm text-gray-400">{currentTrackData?.artist}</p>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleProgressChange}
            className="w-full mt-2 accent-red-500"
          />
        </div>

        <div className="flex justify-center gap-2 mt-3 items-center">
          <button onClick={toggleShuffle} className={`p-2 rounded-md ${isShuffling ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}>🔀</button>
          <button onClick={prevTrack} className="p-2 text-gray-300 hover:text-white">⏮</button>
          <button onClick={togglePlay} className="bg-red-500 text-white text-2xl rounded-full w-14 h-14 flex items-center justify-center">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={nextTrack} className="p-2 text-gray-300 hover:text-white">⏭</button>
          <button onClick={toggleLoop} className={`p-2 rounded-md ${isLooping ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}>🔁</button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2.5">
          <label htmlFor="volume">🔊</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32 accent-red-500"
          />
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        />
      </div>

      {/* Playlist */}
      <div className="w-full bg-[#a59f9f] rounded-xl p-2 shadow-lg">
        {playlist.map((track, index) => (
          <div
            key={index}
            onClick={() => loadTrack(index, true)}
            className={`flex gap-2.5 items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${index === currentTrack ? 'bg-red-500/50' : ''}`}
          >
            <Image src={track.cover} alt={track.title} width={48} height={48} className="w-12 h-12 rounded-md object-cover" />
            <div>
              <strong className="text-sm block">{track.title}</strong>
              <small className="text-xs text-gray-400 block mt-0.5">{track.artist}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};