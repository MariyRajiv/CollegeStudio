export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
  caption: string;
  date: string;
  location?: string;
  width: number;
  height: number;
}

export type Category = 'All' | 'Team Vibes' | 'Creative Campaigns' | 'Work Hard, Play Hard' | 'Behind-the-Scenes';