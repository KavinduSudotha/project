// utils/analysisUtils.js
const { calculateMean, calculateMedian, calculateMode, calculateRange, calculateSkewness } = require('./statUtils');
const { generateLineChart, generateScatterChart } = require('./chartUtils');

const calculateStatistics = (data, field, typeField = null, ignoreZero = false) => {
  let filteredData = ignoreZero ? data.filter(item => item[field] !== 0) : data;

  let values = filteredData.map(item => item[field]);
  let max = Math.max(...values);
  let min = Math.min(...values);
  let mean = calculateMean(values);
  let median = calculateMedian(values);
  let mode = calculateMode(values);
  let range = calculateRange(values);
  let skewness = calculateSkewness(values);

  let maxRecord = filteredData.find(item => item[field] === max);
  let minRecord = filteredData.find(item => item[field] === min);

  let result = {
    max: { value: max, record: maxRecord },
    min: { value: min, record: minRecord },
    mean,
    median,
    mode,
    range,
    skewness,
    lineChart: generateLineChart(filteredData, field, typeField),
    scatterChart: generateScatterChart(filteredData, field, typeField)
  };

  return result;
};

module.exports = { calculateStatistics };
