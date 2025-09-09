import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This ensures content is only available server-side
    const content = {
      title: process.env.SECRET_PAGE_TITLE || '',
      subtitle: process.env.SECRET_PAGE_SUBTITLE || '',
      noteTitle: process.env.SECRET_NOTE_TITLE || '',
      noteParagraph1: process.env.SECRET_NOTE_PARAGRAPH_1 || '',
      noteParagraph2: process.env.SECRET_NOTE_PARAGRAPH_2 || '',
      excitementTitle: process.env.SECRET_EXCITEMENT_TITLE || '',
      excitementParagraph1: process.env.SECRET_EXCITEMENT_PARAGRAPH_1 || '',
      excitementParagraph2: process.env.SECRET_EXCITEMENT_PARAGRAPH_2 || '',
      excitementParagraph3: process.env.SECRET_EXCITEMENT_PARAGRAPH_3 || '',
      fitTitle: process.env.SECRET_FIT_TITLE || '',
      fitParagraph1: process.env.SECRET_FIT_PARAGRAPH_1 || '',
      fitParagraph2: process.env.SECRET_FIT_PARAGRAPH_2 || '',
      fitParagraph3: process.env.SECRET_FIT_PARAGRAPH_3 || '',
      teamTitle: process.env.SECRET_TEAM_TITLE || '',
      sellingPoints: [
        {
          id: 'technical-excellence',
          icon: 'Code',
          title: process.env.SECRET_POINT_1_TITLE || '',
          highlight: process.env.SECRET_POINT_1_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_1_DESCRIPTION || ''
        },
        {
          id: 'product-mindset',
          icon: 'Target',
          title: process.env.SECRET_POINT_2_TITLE || '',
          highlight: process.env.SECRET_POINT_2_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_2_DESCRIPTION || ''
        },
        {
          id: 'rapid-learning',
          icon: 'Zap',
          title: process.env.SECRET_POINT_3_TITLE || '',
          highlight: process.env.SECRET_POINT_3_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_3_DESCRIPTION || ''
        },
        {
          id: 'collaboration',
          icon: 'Users',
          title: process.env.SECRET_POINT_4_TITLE || '',
          highlight: process.env.SECRET_POINT_4_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_4_DESCRIPTION || ''
        },
        {
          id: 'innovation',
          icon: 'Lightbulb',
          title: process.env.SECRET_POINT_5_TITLE || '',
          highlight: process.env.SECRET_POINT_5_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_5_DESCRIPTION || ''
        },
        {
          id: 'passion',
          icon: 'Heart',
          title: process.env.SECRET_POINT_6_TITLE || '',
          highlight: process.env.SECRET_POINT_6_HIGHLIGHT || '',
          description: process.env.SECRET_POINT_6_DESCRIPTION || ''
        }
      ]
    };

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}