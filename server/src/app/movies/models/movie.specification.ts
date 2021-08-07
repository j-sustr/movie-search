import { MovieType } from './movie';

export enum MoviePlotType {
  Short = 'short',
  Full = 'full',
}

export interface MovieSpecification {
  title: string;
  type?: MovieType;
  releaseYear?: number;
  plot?: MoviePlotType;
}
