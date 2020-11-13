import { get } from './https.js'

export const Title = params => get('/api/tabs/selected', params);
// export const Title = params => get('/api/tabs/selected', params);