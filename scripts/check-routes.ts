const requiredRoutes = ['/', '/produkte', '/baustellenzubehoer', '/feinsteinzeug', '/badezimmer', '/spc-vinyl', '/raumkonzepte', '/projektanfrage', '/kontakt'];
const redirects: Record<string, string> = { '/premium-mosaike': '/badezimmer', '/bad-sanitaer': '/raumkonzepte' };

for (const route of requiredRoutes) {
  if (!route.startsWith('/')) throw new Error(`Invalid route: ${route}`);
}
for (const [from, to] of Object.entries(redirects)) {
  if (!requiredRoutes.includes(to)) throw new Error(`Redirect ${from} points to unknown route ${to}`);
}
console.log(`Route check passed for ${requiredRoutes.length} routes and ${Object.keys(redirects).length} redirects.`);
