import { ContentData, ContentItem } from '../types/content';
import contentData from '../data/content.json';

// Get all content as a flat array for searching
export const getAllContent = (): ContentItem[] => {
  const data = contentData as ContentData;
  return [
    ...data.experiences,
    ...data.projects,
    ...data.education,
    ...data.about
  ];
};

// Get content by ID
export const getContentById = (id: string): ContentItem | undefined => {
  return getAllContent().find(item => item.id === id);
};

// Get content by type
export const getContentByType = (type: keyof ContentData): ContentItem[] => {
  const data = contentData as ContentData;
  return data[type] || [];
};

// Search content by title, company, skills, or detail
export const searchContent = (query: string): ContentItem[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const allContent = getAllContent();
  
  return allContent.filter(item => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.company.toLowerCase().includes(searchTerm) ||
      item.detail.toLowerCase().includes(searchTerm) ||
      item.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  });
};

// Get content by skill
export const getContentBySkill = (skill: string): ContentItem[] => {
  const allContent = getAllContent();
  return allContent.filter(item =>
    item.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
};