export const DONATION_CATEGORIES = [
  { value: 'FOOD',    label: 'Food',    emoji: '🍱' },
  { value: 'CLOTHES', label: 'Clothes', emoji: '👕' },
  { value: 'BOOKS',   label: 'Books',   emoji: '📚' },
] as const;

export type CategoryKey = 'FOOD' | 'CLOTHES' | 'BOOKS';

export const ITEM_TYPES: Record<CategoryKey, string[]> = {
  FOOD: [
    'Cooked Food',
    'Vegetables',
    'Fruits',
    'Bakery',
    'Dairy',
    'Grains & Pulses',
    'Packaged Food',
    'Other Food',
  ],
  CLOTHES: [
    "Men's Wear",
    "Women's Wear",
    "Children's Wear",
    'Winter Wear',
    'Footwear',
    'Accessories',
    'Other Clothes',
  ],
  BOOKS: [
    'Textbooks',
    'Story Books',
    'Children Books',
    'Religious Books',
    'Reference Books',
    'Magazines',
    'Other Books',
  ],
};

export const CATEGORY_COLORS: Record<CategoryKey, string> = {
  FOOD:    'bg-orange-100 text-orange-700',
  CLOTHES: 'bg-blue-100 text-blue-700',
  BOOKS:   'bg-purple-100 text-purple-700',
};

export const CATEGORY_EMOJI: Record<CategoryKey, string> = {
  FOOD:    '🍱',
  CLOTHES: '👕',
  BOOKS:   '📚',
};
