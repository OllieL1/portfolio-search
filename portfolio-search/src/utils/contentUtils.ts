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

// Search content by title, company, skills, or detail with advanced scoring
export const searchContent = (query: string): ContentItem[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const searchTerms = searchTerm.split(' ').filter(term => term.length > 0);
  const allContent = getAllContent();
  
  const resultsWithScore = allContent.map(item => {
    let score = 0;
    let foundInSkills = false;
    
    // Score based on matches in different fields
    searchTerms.forEach(term => {
      // Title matches (highest weight)
      if (item.title.toLowerCase().includes(term)) {
        score += 10;
      }
      
      // Company matches
      if (item.company.toLowerCase().includes(term)) {
        score += 5;
      }
      
      // Category matches
      if (item.category.toLowerCase().includes(term)) {
        score += 3;
      }
      
      // Detail matches
      if (item.detail.toLowerCase().includes(term)) {
        score += 2;
      }
      
      // Skills matches (for tie-breaking)
      if (item.skills.some(skill => skill.toLowerCase().includes(term))) {
        score += 8;
        foundInSkills = true;
      }
    });
    
    return {
      ...item,
      searchScore: score,
      foundInSkills
    };
  }).filter(item => item.searchScore > 0);
  
  // Sort by: 1) relevance (if exists), 2) search score, 3) found in skills, 4) title alphabetically
  return resultsWithScore.sort((a, b) => {
    // Primary sort: relevance (higher is better)
    const relevanceA = a.relevance || 0;
    const relevanceB = b.relevance || 0;
    if (relevanceA !== relevanceB) {
      return relevanceB - relevanceA;
    }
    
    // Secondary sort: search score
    if (a.searchScore !== b.searchScore) {
      return b.searchScore - a.searchScore;
    }
    
    // Tertiary sort: found in skills (skills matches prioritized)
    if (a.foundInSkills !== b.foundInSkills) {
      return a.foundInSkills ? -1 : 1;
    }
    
    // Final sort: alphabetical by title
    return a.title.localeCompare(b.title);
  });
};

// Get content by skill with exact matches only
export const getContentBySkill = (skill: string): ContentItem[] => {
  if (!skill.trim()) return [];
  
  const allContent = getAllContent();
  const skillLower = skill.toLowerCase();
  
  const resultsWithScore = allContent.filter(item =>
    // Change from includes() to exact match using ===
    item.skills.some(s => s.toLowerCase() === skillLower)
  ).map(item => {
    let score = 0;
    
    // Score based on exact skill matches (all matches are exact now)
    item.skills.forEach(itemSkill => {
      const itemSkillLower = itemSkill.toLowerCase();
      if (itemSkillLower === skillLower) {
        score += 10; // Exact match
      }
    });
    
    return {
      ...item,
      skillScore: score
    };
  });
  
  // Sort by: 1) relevance (if exists), 2) skill score, 3) title alphabetically
  return resultsWithScore.sort((a, b) => {
    // Primary sort: relevance (higher is better)
    const relevanceA = a.relevance || 0;
    const relevanceB = b.relevance || 0;
    if (relevanceA !== relevanceB) {
      return relevanceB - relevanceA;
    }
    
    // Secondary sort: skill score
    if (a.skillScore !== b.skillScore) {
      return b.skillScore - a.skillScore;
    }
    
    // Final sort: alphabetical by title
    return a.title.localeCompare(b.title);
  });
};