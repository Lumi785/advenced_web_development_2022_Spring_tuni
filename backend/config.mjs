export const getConfig = (exercise = null) => {
  switch (exercise) {
    case 'react-crud2':
    case 'redux-crud2':
    case 'vue-crud2':
    case 'vuex-crud2':
      return { enableAuthentication: true };
    case 'react-fetch':
    case 'redux-fetch':
    case 'vue-fetch':
    case 'vuex-fetch':
    case 'react-crud':
    case 'redux-crud':
    case 'vue-crud':
    case 'vuex-crud':
    default:
      return { enableAuthentication: false };
      // throw new Error('Missing configuration. Unknown exercise.');
  }
};
