// src/data/playlist.ts
export interface Track {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

export const playlist: Track[] = [
  {
    title: "Muda tudo",
    artist: "Dani Black",
    src: "/musica3.mp3", // O Next.js entende que a / aponta para a pasta 'public'
    cover: "/imagem.png"
  },
  {
    title: "Errei De Novo",
    artist: "MC Don Juan, MC Ryan SP",
    src: "/musica1.mp3",
    cover: "/image2.png"
  },
  {
    title: "Deslocado",
    artist: "NAPA",
    src: "/musica2.mp3",
    cover: "/imagem3.png"
  }
];