const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';

export async function getTenantConfig(tenant) {
  try {
    const res = await fetch(`${API_URL}/api/tenant/config?tenant=${tenant}`);
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
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    backgroundColor: '#FFFFFF',
    textColor: '#1E293B',
    hero: {
      title: 'Bienvenido',
      subtitle: 'Cargando información...',
      ctaText: 'Comenzar',
      ctaLink: '/app',
    },
    features: [],
    footer: { text: '© 2026', links: [] },
  };
}
