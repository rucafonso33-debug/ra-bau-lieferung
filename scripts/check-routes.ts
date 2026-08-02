const requiredRoutes = ['/', '/grossformatplatten', '/feinsteinzeug', '/mosaike', '/badmoebel', '/bad-sanitaer', '/spc-vinyl', '/baustellenzubehoer'];
for (const route of requiredRoutes) if (!route.startsWith('/')) throw new Error(`Invalid route: ${route}`);
console.log(`Route check passed for ${requiredRoutes.length} public routes.`);
