// src/hooks/useAudioPlayer.ts
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '@/data/playlist';

export const useAudioPlayer = (playlist: Track[]) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const loadTrack = useCallback((index: number, autoPlay = false) => {
    if (audioRef.current && playlist[index]) {
      audioRef.current.src = playlist[index].src;
      setCurrentTrack(index);
      if (autoPlay) {
        setTimeout(() => { audioRef.current?.play().catch(console.error); }, 150);
      }
    }
  }, [playlist]);

  useEffect(() => { loadTrack(0); }, [loadTrack]); // Carrega a primeira faixa apenas uma vez

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping;
  }, [isLooping]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const wasPlaying = isPlaying;
    setIsPlaying(!wasPlaying);
    if (!wasPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  };

  const nextTrack = useCallback(() => {
    const nextIndex = isShuffling
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrack + 1) % playlist.length;
    loadTrack(nextIndex, isPlaying);
  }, [currentTrack, isShuffling, isPlaying, playlist.length, loadTrack]);

  const prevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIndex = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex, isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && isFinite(duration)) {
      audioRef.current.currentTime = (Number(e.target.value) / 100) * duration;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      const newTime = audioRef.current.currentTime;
      const newProgress = (newTime / audioRef.current.duration) * 100;
      setCurrentTime(newTime);
      setProgress(newProgress);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  
  const handleEnded = () => {
    if (!isLooping) nextTrack();
  };

  return {
    audioRef, isPlaying, isShuffling, isLooping, currentTrack, currentTime, duration, volume, progress,
    togglePlay, nextTrack, prevTrack, loadTrack,
    toggleShuffle: () => setIsShuffling(!isShuffling),
    toggleLoop: () => setIsLooping(!isLooping),
    handleProgressChange, handleVolumeChange,
    handleTimeUpdate, handleLoadedMetadata, handleEnded,
    setIsPlaying
  };
};