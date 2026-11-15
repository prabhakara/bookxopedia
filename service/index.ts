import { ApiError } from '@/utils/error';
import { IBook, IBookResponse } from '@/model/books';
import { GOOGLE_BOOKS_API_BASE_URL } from '@/constants';

type BooksFilter = {
  q?: string;
  printType?: string;
  orderBy?: string;
  maxResults?: number;
  filter?: string;
};

const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_BOOKS_API_KEY?.trim();
  if (!apiKey || apiKey === 'replace_with_your_google_books_api_key') {
    throw new ApiError(
      'Set a valid Google Books API key in NEXT_PUBLIC_BOOKS_API_KEY.',
      400
    );
  }
  return apiKey;
};

export const getBooksList = async (
  searchParams?: BooksFilter | undefined
): Promise<IBookResponse> => {
  try {
    const apiKey = getApiKey();
    const url = new URL(GOOGLE_BOOKS_API_BASE_URL);
    const queryTerm = !searchParams?.q
      ? searchParams?.orderBy === 'newest'
        ? 'B'
        : 'C'
      : searchParams?.q;
    const params: Record<string, string> = {
      q: queryTerm,
      printType: searchParams?.printType ?? 'books',
      startIndex: '0',
      maxResults: (searchParams?.maxResults ?? 40).toString(),
      orderBy: searchParams?.orderBy ?? 'relevance',
    };

    if (!params.q.includes('subject:')) {
      params['filter'] = searchParams?.filter ?? 'partial';
    }
    url.search = new URLSearchParams(params).toString();
    url.searchParams.set('key', apiKey);
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Rate limit exceeded', 429);
      } else {
        throw new ApiError('Failed to fetch data', response.status);
      }
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (volumeId: string): Promise<IBook> => {
  try {
    const apiKey = getApiKey();
    const url = new URL(`${GOOGLE_BOOKS_API_BASE_URL}/${volumeId}`);
    url.searchParams.set('key', apiKey);
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Rate limit exceeded', 429);
      } else {
        throw new ApiError('Failed to fetch data', response.status);
      }
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
