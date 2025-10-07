// src/app/page.tsx
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <MusicPlayer />
    </main>
  );
}