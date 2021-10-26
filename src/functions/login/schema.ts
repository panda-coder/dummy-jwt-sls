export default {
  type: "object",
  properties: {
    user: { type: 'string' },
    pass: { type: 'string' }
  },
  required: ['user', 'pass']
} as const;
