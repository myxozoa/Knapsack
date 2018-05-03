const fs = require('fs');

const timedRun = (label, func, items, capacity) => {
  console.log(label, ': ', func(items, capacity));
}

const greedy = (items, capacity) => {
  const result = {
    value: 0,
    size: 0,
    chosen: [],
  }

  items = items.slice(1);

  items.sort((i0, i1) => {
    const r0 = i0.value / i0.size;
    const r1 = i1.value / i1.size;

    return r1 - r0;
  });

  for (let i = 0; i < items.length && capacity > 0; i++) {
    const item = items[i];

    if (item.size <= capacity) {
      result.value += item.value;
      result.size += item.size;
      result.chosen.push(item.index);

      capacity -= item.size;
    }
  }

  return result;
}



const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage: knapsack file capacity');
  process.exit(1);
}

const filename = args[0];
const capacity = +args[1];

const filedata = fs.readFileSync(filename, 'utf-8');
const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

  items[index] = {
    index: index,
    size: size,
    value: value
  };
}

timedRun('Result', greedy, items, capacity);
