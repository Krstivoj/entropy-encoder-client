import localConfig   from './config.local.json';
import stagingConfig from './config.staging.json';

export function config() {
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'development':
    case 'test': {
      return localConfig;
    }
    case 'staging': {
      return stagingConfig;
    }
    case 'production': {
      return stagingConfig;
    }

    default: {
      return localConfig;
    }
  }
}

export default {
  config
};

