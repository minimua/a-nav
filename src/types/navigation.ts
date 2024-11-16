export interface Link {
    title: string;
    description: string;
    url: string;
    icon?: string;
    tags?: string[];
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    links: Link[];
  }
  
  export interface NavigationData {
    categories: Category[];
  }