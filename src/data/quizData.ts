export type question = {
  id: string;
  question: string;
  options: string[];
  correct_option: string;
};

export const questions: question[] = [
  {
    id: '001',
    question: 'What is React Native?',
    options: ['Framework', 'Library', 'IDE', 'Package'],
    correct_option: 'Framework',
  },
  {
    id: '002',
    question: 'Which component does not exist in React Native?',
    options: ['Button', 'View', 'Text', 'Img'],
    correct_option: 'Img',
  },
  {
    id: '003',
    question: 'How can you re-render a Flatlist?',
    options: ['We can not', 'With extraData property', 'With rerender property', 'Reboot phone'],
    correct_option: 'With extraData property',
  },
  {
    id: '004',
    question: 'What is the name of JavaScript engine optimized for React Native?',
    options: ['Hermes', 'Apollo', 'Zeus', 'Dionysus'],
    correct_option: 'Hermes',
  },
  {
    id: '005',
    question: 'Which company developed React Native?',
    options: ['Microsoft', 'Coca-cola', 'Facebook', 'Tesla'],
    correct_option: 'Facebook',
  },
];
