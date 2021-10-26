export default {
  type: "object",
  properties: {
    user: { type: 'string' },
    pass: { type: 'string' }
  },
  required: ['name', 'pass']
} as const;
