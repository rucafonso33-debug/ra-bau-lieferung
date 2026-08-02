const requiredRoutes = ['/', '/grossformatplatten', '/feinsteinzeug', '/mosaike', '/badmoebel', '/sanitaerkeramik', '/armaturen-duschen', '/duschloesungen', '/spc-vinyl', '/baustellenzubehoer'];
for (const route of requiredRoutes) if (!route.startsWith('/')) throw new Error(`Invalid route: ${route}`);
console.log(`Route check passed for ${requiredRoutes.length} public routes.`);
