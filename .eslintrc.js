module.exports = {
  'extends': ['taro/react', 'prettier'],
  'rules': {
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
  }
}
