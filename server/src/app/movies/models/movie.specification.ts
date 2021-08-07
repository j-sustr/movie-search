import { MovieType } from './movie';

export type MoviePlotType = 'short' | 'full';

export interface MovieSpecification {
  title: string;
  type?: MovieType;
  releaseYear?: number;
  plot?: MoviePlotType;
}
