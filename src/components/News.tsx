import useSWR from 'swr';
import { format } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function News() {
  const { data, error, isLoading } = useSWR('https://api.deadlock-api.com/v1/patches', fetcher);

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              Failed to load news data. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold leading-6 text-gray-900">Latest Updates</h2>
        <p className="mt-1 text-sm text-gray-500">Recent patches and game updates</p>
      </div>

      <div className="mt-8 space-y-8">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          data?.map((patch: any) => (
            <article key={patch.guid.text} className="relative isolate flex flex-col gap-8 lg:flex-row">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gray-50 object-cover" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={patch.pub_date} className="text-gray-500">
                    {format(new Date(patch.pub_date), 'MMMM d, yyyy')}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {patch.category.text}
                  </span>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={patch.link}>
                      <span className="absolute inset-0" />
                      {patch.title}
                    </a>
                  </h3>
                  <div
                    className="mt-5 text-sm leading-6 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: patch.content_encoded }}
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}