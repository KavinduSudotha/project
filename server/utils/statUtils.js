// utils/statUtils.js
const calculateMean = (values) => {
    let sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };
  
  const calculateMedian = (values) => {
    values.sort((a, b) => a - b);
    let middle = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
      return (values[middle - 1] + values[middle]) / 2;
    } else {
      return values[middle];
    }
  };
  
  const calculateMode = (values) => {
    let frequency = {};
    values.forEach(value => frequency[value] = (frequency[value] || 0) + 1);
    let maxFreq = Math.max(...Object.values(frequency));
    let modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
    return modes.map(Number);
  };
  
  const calculateRange = (values) => {
    let min = Math.min(...values);
    let max = Math.max(...values);
    return max - min;
  };
  
  const calculateSkewness = (values) => {
    let mean = calculateMean(values);
    let stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
    let skewness = values.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / values.length;
    skewness /= Math.pow(stdDev, 3);
    return skewness;
  };
  
  module.exports = { calculateMean, calculateMedian, calculateMode, calculateRange, calculateSkewness };
  