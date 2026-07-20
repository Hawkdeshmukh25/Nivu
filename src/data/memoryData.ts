export interface Memory {
  id: string;
  title: string;
  date: string;
  place?: string;
  message: string;
  mediaUrls: string[];
  isFavorite: boolean;
  x: number;
  y: number;
}

export const newMemories: Memory[] = [
  {
    id: '1',
    title: 'Memories at 2:40 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 2.49.35 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.49.56 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 2.49.28 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.49.29 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.49.34 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '2',
    title: 'Memories at 2:50 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 2.51.42 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.52.32 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.53.47 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.53.48 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.57.03 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.57.04 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 2.57.04 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 2.59.12 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 2.51.05 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.51.07 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.51.12 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.51.41 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.54.38 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.55.21 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 2.56.29 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '3',
    title: 'Memories at 3:00 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 3.02.57 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.02.58 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.02.58 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.02.59 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.03.00 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 3.02.58 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '4',
    title: 'Memories at 3:10 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 3.10.39 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.11.18 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.12.07 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.12.07 AM (2).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.12.07 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.12.08 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.12.36 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 3.11.05 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 3.12.47 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '5',
    title: 'Memories at 3:30 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 3.30.32 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.39.05 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.39.06 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.39.07 AM.jpeg'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '6',
    title: 'Memories at 3:40 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 3.42.41 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.42.41 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.42.42 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.42.42 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.42.43 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.04 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.05 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.05 AM (2).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.05 AM (3).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.05 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.06 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.06 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.44.32 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.45.29 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.45.49 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.46.23 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.46.24 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.46.24 AM (2).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.46.24 AM (3).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.46.24 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 3.46.46 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  },
  {
    id: '7',
    title: 'Memories at 3:50 AM',
    date: '2026-07-20',
    place: '',
    message: 'A collection of moments we shared.',
    mediaUrls: [
      '/WhatsApp Image 2026-07-20 at 3.50.22 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.50.23 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.50.50 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.35 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.35 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.36 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.36 AM (2).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.36 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.37 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.51.37 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.53.41 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.53.41 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.53.48 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.54.10 AM.jpeg',
      '/WhatsApp Image 2026-07-20 at 3.54.11 AM (1).jpeg',
      '/WhatsApp Image 2026-07-20 at 3.54.11 AM.jpeg',
      '/WhatsApp Video 2026-07-20 at 3.53.47 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 3.53.49 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 3.54.10 AM (1).mp4',
      '/WhatsApp Video 2026-07-20 at 3.54.10 AM (2).mp4',
      '/WhatsApp Video 2026-07-20 at 3.54.10 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 3.54.11 AM.mp4',
      '/WhatsApp Video 2026-07-20 at 3.54.12 AM.mp4'
    ],
    isFavorite: false,
    x: 50,
    y: 50,
  }
];
 
