// utils/chartUtils.js
const generateLineChart = (data, field, typeField = null) => {
    let chartData = {};
    data.forEach(item => {
      let date = item.date;
      let type = typeField ? item[typeField] : 'default';
      if (!chartData[type]) {
        chartData[type] = {};
      }
      if (!chartData[type][date]) {
        chartData[type][date] = 0;
      }
      chartData[type][date] += item[field];
    });
    return chartData;
  };
  
  const generateScatterChart = (data, field, typeField = null) => {
    let chartData = {};
    data.forEach(item => {
      let date = item.date;
      let type = typeField ? item[typeField] : 'default';
      if (!chartData[type]) {
        chartData[type] = [];
      }
      chartData[type].push({ x: date, y: item[field] });
    });
    return chartData;
  };
  
  module.exports = { generateLineChart, generateScatterChart };
  