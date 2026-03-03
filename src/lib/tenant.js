export function getTenantSlug(request) {
  const url = new URL(request.url);
  const paramTenant = url.searchParams.get('tenant');
  if (paramTenant) return paramTenant;

  const host = request.headers.get('host') || '';
  const parts = host.split('.');
  if (parts.length > 2 && parts[0] !== 'www') {
    return parts[0];
  }
  return 'default';
}
