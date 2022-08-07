export interface Boutique {
    _id: string;
    name: string;
    slug: string;
    location: {
      lon: number;
      lat: number;
    };
    founder_quote: string;
    distance: number;
    description: string;
    logo?: {
      url: string;
    };
  }
  
  export type BoutiquesResponse = {
    boutiques: Boutique[]
  }