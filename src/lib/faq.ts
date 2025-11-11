import { FAQ } from '@/types/content';
import faqEnData from '@/data/faq-en.json';
import faqTrData from '@/data/faq-tr.json';

/**
 * Get all FAQs for a specific locale
 */
export function getAllFAQs(locale: string = 'en'): FAQ[] {
  const data = locale === 'tr' ? faqTrData : faqEnData;
  
  return data.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
}

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category: string, locale: string = 'en'): FAQ[] {
  const allFAQs = getAllFAQs(locale);
  return allFAQs.filter(faq => faq.category === category);
}

/**
 * Get all unique FAQ categories
 */
export function getFAQCategories(locale: string = 'en'): string[] {
  const allFAQs = getAllFAQs(locale);
  const categories = new Set(allFAQs.map(faq => faq.category));
  return Array.from(categories);
}

/**
 * Search FAQs by query
 */
export function searchFAQs(query: string, locale: string = 'en'): FAQ[] {
  if (!query || query.trim() === '') {
    return getAllFAQs(locale);
  }

  const allFAQs = getAllFAQs(locale);
  const searchTerm = query.toLowerCase().trim();

  return allFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm) ||
    faq.category.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get FAQ by ID
 */
export function getFAQById(id: string, locale: string = 'en'): FAQ | undefined {
  const allFAQs = getAllFAQs(locale);
  return allFAQs.find(faq => faq.id === id);
}
