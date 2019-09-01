import localConfig from './config.local.json';
import stagingConfig from './config.staging.json';

export function config() {
  switch (process.env.REACT_APP_ENV) {
    case 'development':
    case 'test': {
      return localConfig;
    }
    case 'staging': {
      return stagingConfig;
    }
    case 'production': {
      return {};
    }

    default: {
      return localConfig;
    }
  }
}

export default {
  config
};

