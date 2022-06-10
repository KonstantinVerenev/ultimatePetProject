export type Question = {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
};

export const questions: Question[] = [
  {
    id: '001',
    question: 'What is React Native?',
    options: ['Framework', 'Library', 'IDE', 'Package'],
    correctOption: 'Framework',
  },
  {
    id: '002',
    question: 'Which component does not exist in React Native?',
    options: ['Button', 'View', 'Text', 'Img'],
    correctOption: 'Img',
  },
  {
    id: '003',
    question: 'How can you re-render a Flatlist?',
    options: ['We can not', 'With extraData property', 'With rerender property', 'Reboot phone'],
    correctOption: 'With extraData property',
  },
  {
    id: '004',
    question: 'What is the name of JavaScript engine optimized for React Native?',
    options: ['Hermes', 'Apollo', 'Zeus', 'Dionysus'],
    correctOption: 'Hermes',
  },
  {
    id: '005',
    question: 'Which company developed React Native?',
    options: ['Microsoft', 'Coca-cola', 'Facebook', 'Tesla'],
    correctOption: 'Facebook',
  },
];
