"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchContent } from '../../utils/contentUtils';
import SearchResults from '../../components/SearchResults';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Perform search with the query
  const results = searchContent(query);

  const handleResultClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <SearchResults
      query={query}
      results={results}
      onResultClick={handleResultClick}
      onBack={handleBack}
    />
  );
}

export default function Search() {
  return (
    <>
        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchContent />
        </Suspense>
    </>
  );
}