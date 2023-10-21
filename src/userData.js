import { romanizations } from './kana.js';

export function initializeWeights()
{
  const weights = 
    Object.keys(romanizations).reduce((list, kana) => 
    {
      list[kana] = 1.0;
      return list;
    }, {});

  storeWeights(weights);
  return weights;
}

export function resetWeights()
{
  localStorage.clear('userData');
}

export function loadWeights()
{
  const weights = localStorage.getItem('userData');
  return weights ? JSON.parse(weights) : initializeWeights();
}

export function storeWeights(weights)
{
  localStorage.setItem('userData', JSON.stringify(weights));
}

export function decreaseWeight(kana)
{
  const weights = loadWeights();
  weights[kana] *= 0.8;
  storeWeights(weights);
}

export function increaseWeight(kana)
{
  const weights = loadWeights();
  weights[kana] *= 1.5;
  storeWeights(weights);
}