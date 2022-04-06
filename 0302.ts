const a = [1, 100, 0, 5, 1, 5];
const b = [2, 5, 5, 5, 1, 3];

// => [0, 1, 1, 2, 3, 5, 5, 5, 100];

function fn1(nums1: number[], nums2: number[]): number[] {
  const nums: number[] = [];
  const map1: Map<number, number> = new Map();
  const map2 = new Map();
  for (const num of nums1) {
    map1.set(num, (map1.get(num) || 0) + 1);
  }
  for (const num of nums2) {
    map2.set(num, (map2.get(num) || 0) + 1);
  }
  for (const i of map1.keys()) {
    (map1.get(i) as number) < map2.get(i) && map1.set(i, map2.get(i));
    map2.delete(i);
    nums.push(...new Array(map1.get(i)).fill(i));
  }
  for (const i of map2.keys()) {
    nums.push(...new Array(map2.get(i)).fill(i));
  }
  return nums.sort((x, y) => x - y);
}

// console.log(fn1(a, b));


const prices = [3,2,1,4]

// => 7
function fn2(prices:number[]):number {
  let dp = 1;
  let ans = 1;
  for (let i = 1; i < prices.length; i++){
      dp = ((prices[i] == (prices[i-1]-1)) ? dp : 0) + 1;
      ans += dp;
  }
  return ans;
}

console.log(fn2(prices));