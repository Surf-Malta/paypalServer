/**
 * Section Types
 */

export type SectionType = 
  | 'hero' 
  | 'stats' 
  | 'how-it-works' 
  | 'features' 
  | 'mobile-app' 
  | 'testimonials' 
  | 'faq' 
  | 'get-started'
  | 'cta';

export interface Section {
  id: string;
  type: SectionType;
  name: string;
  order: number;
  isActive: boolean;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSectionDto {
  type: SectionType;
  name: string;
  order: number;
  isActive?: boolean;
  content: any;
}

export interface UpdateSectionDto {
  name?: string;
  order?: number;
  isActive?: boolean;
  content?: any;
}
