export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export type ImageSize = '1K' | '2K' | '4K';
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageGenerationParams {
  prompt: string;
  size: ImageSize;
  aspectRatio: AspectRatio;
}

export interface GenerationResult {
  imageUrl: string | null;
  error: string | null;
}
