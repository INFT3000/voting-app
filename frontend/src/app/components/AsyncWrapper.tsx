export type AsyncWrapperProps = {
  children: React.ReactNode;
  requests: {
    loading: boolean;
    error?: Error | null;
  }[],
};

export function AsyncWrapper({
  children,
  requests,
}: AsyncWrapperProps): JSX.Element {
  const loading = requests.some((req) => req.loading);

  // ignore error for now.

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
        {/* todo: Spinner */}
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
}
