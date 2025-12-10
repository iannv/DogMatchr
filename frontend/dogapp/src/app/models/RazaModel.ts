export interface RazaResponse {
  dogapi: Dogapi;
  ninja: Ninja[];
}

export interface Dogapi {
  weight?: {
    imperial?: string;
    metric?: string;
  };
  height?: {
    imperial?: string;
    metric?: string;
  };
  id: number;
  name: string;
  breed_group?: string;
  bred_for?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id: string | null;
  image?: Image | null;
}

export interface Image {
  id: string;
  width?: number;
  height?: number;
  url: string;
}

export interface Ninja {
  image_link?: string;
  good_with_children?: number;
  good_with_other_dogs?: number;
  shedding?: number;
  grooming?: number;
  drooling?: number;
  coat_length?: number;
  good_with_strangers?: number;
  playfulness?: number;
  protectiveness?: number;
  trainability?: number;
  energy?: number;
  barking?: number;
  min_life_expectancy?: number;
  max_life_expectancy?: number;
  max_height_male?: number;
  max_height_female?: number;
  max_weight_male?: number;
  max_weight_female?: number;
  min_height_male?: number;
  min_height_female?: number;
  min_weight_male?: number;
  min_weight_female?: number;
  name: string;
}
