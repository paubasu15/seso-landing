const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';

export async function getTenantConfig(tenant, options = {}) {
  try {
    const params = new URLSearchParams({ tenant });
    if (options.draft) {
      params.set('draft', 'true');
    }
    const res = await fetch(`${API_URL}/api/tenant/config?${params}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching tenant config:', error);
    return getDefaultConfig(tenant);
  }
}

function getDefaultConfig(tenant) {
  return {
    slug: tenant,
    name: tenant.charAt(0).toUpperCase() + tenant.slice(1),
    template: 'starter',
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    backgroundColor: '#FFFFFF',
    textColor: '#1E293B',
    components: [
      { type: 'header', order: 1, visible: true, data: { showLogo: true } },
      { type: 'hero', order: 2, visible: true, data: { title: 'Bienvenido', subtitle: 'Cargando...', ctaText: 'Comenzar', ctaLink: '/app' } },
      { type: 'features', order: 3, visible: true, data: { title: 'Servicios', items: [] } },
      { type: 'footer', order: 4, visible: true, data: { text: '© 2026', links: [] } },
    ],
  };
}
