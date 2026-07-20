export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  moodTag: string;
  audioUrl?: string; // For actual audio playback if needed
  youtubeUrl?: string;
  spotifyUrl?: string;
  spotifyEmbedId?: string; // Add this for Spotify iframe player
  memory?: string;
  philosophicalQuestion?: string;
}

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    duration: '0:00',
    moodTag: 'your playlist',
    spotifyEmbedId: '6Qs4SXO9dwPj5GKvVOv8Ki'
  },
  {
    id: '2',
    title: "Track 2",
    artist: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    duration: '0:00',
    moodTag: 'your playlist',
    spotifyEmbedId: '3xEJz6EH1B49HAcNh07bCg'
  },
  {
    id: '3',
    title: 'Track 3',
    artist: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    duration: '0:00',
    moodTag: 'your playlist',
    spotifyEmbedId: '57RA3JGafJm5zRtKJiKPIm'
  },
  {
    id: '4',
    title: 'Track 4',
    artist: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    duration: '0:00',
    moodTag: 'your playlist',
    spotifyEmbedId: '0q5e5KtUOhYQujmhLP0pKd'
  },
  {
    id: '5',
    title: 'Track 5',
    artist: 'Spotify',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    duration: '0:00',
    moodTag: 'your playlist',
    spotifyEmbedId: '1PYbrx8dVS1fpbjPWILEzG'
  }
];
