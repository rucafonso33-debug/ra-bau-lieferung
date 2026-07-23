import { useEffect, useMemo, useState } from 'react';
import { redirects, routes, type AppPage } from '../config/business';

const pathToPage = Object.fromEntries(Object.entries(routes).map(([page, path]) => [path, page])) as Record<string, AppPage>;

export function useAppRoute() {
  const initialPath = redirects[window.location.pathname] ?? window.location.pathname;
  const [page, setPage] = useState<AppPage>(pathToPage[initialPath] ?? 'not-found');

  useEffect(() => {
    if (redirects[window.location.pathname]) {
      window.history.replaceState({}, '', redirects[window.location.pathname]);
    }
    const onPopState = () => setPage(pathToPage[window.location.pathname] ?? 'not-found');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useMemo(() => (next: AppPage) => {
    const path = routes[next] ?? '/';
    if (window.location.pathname !== path) window.history.pushState({ page: next }, '', path);
    setPage(next);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, []);

  return { page, navigate };
}
