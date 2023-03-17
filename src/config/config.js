let development = process.env.NODE_ENV !== 'production'

export const frontUrl = development ? 'http://localhost:3000' : 'https://bloonsoo.com'