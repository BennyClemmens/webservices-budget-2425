import config from 'config';
import packageJson from '../../package.json';

export const ping = () => ({ // ronde haken voor oneliner met object
  pong: true,
});

// evt een check op de databank (er een select 1+1 naartoe sturen)

/**
 * Get the running server's information.
 */
export const getVersion = () => ({
  env: config.get<string>('node_env'),
  version: packageJson.version,
  name: packageJson.name,
  author: packageJson.author,
});
