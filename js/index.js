// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/components/forEachPolyfill.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Foreach polyfill for browsers
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var foreachPolyfill = function foreachPolyfill() {
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;

          for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
          }
        };
      }
    };

    exports.default = foreachPolyfill;
  },{}],"js/components/initializeChart.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Initializes chartJs
     */

    var _this = this;

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var initializeChart = function initializeChart() {
      var pieChart = document.querySelectorAll('.js-pie-chart');

      var getOrCreateTooltip = function getOrCreateTooltip(chart) {
        var tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.style.maxWidth = '150px';
          tooltipEl.style.fontSize = '12px';
          tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
          tooltipEl.style.borderRadius = '3px';
          tooltipEl.style.color = 'white';
          tooltipEl.style.opacity = 1;
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all 0.5s ease';
          var table = document.createElement('table');
          table.style.margin = '0px';
          tooltipEl.appendChild(table);
          chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
      };

      var externalTooltipHandler = function externalTooltipHandler(context) {
        var chart = context.chart,
            tooltip = context.tooltip;
        var tooltipEl = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(function (b) {
            return b.lines;
          });
          var tableHead = document.createElement('thead');
          titleLines.forEach(function (title) {
            var tr = document.createElement('tr');
            tr.style.borderWidth = "0";
            var th = document.createElement('th');
            th.style.borderWidth = "0";
            var text = document.createTextNode(title);
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          });
          var tableBody = document.createElement('tbody');
          bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.border = '2px solid #fff';
            span.style.marginRight = '5px';
            span.style.height = '12px';
            span.style.width = '12px';
            span.style.display = 'inline-block';
            var tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = "0";
            var td = document.createElement('td');
            td.style.borderWidth = "0";
            var text = document.createTextNode(body);
            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
          });
          var tableRoot = tooltipEl.querySelector('table');

          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
          }

          tableRoot.appendChild(tableHead);
          tableRoot.appendChild(tableBody);
        }

        var _chart$canvas = chart.canvas,
            positionX = _chart$canvas.offsetLeft,
            positionY = _chart$canvas.offsetTop;
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
      };

      if (pieChart.length > 0) {
        var data = {
          datasets: [{
            label: 'My First dataset',
            backgroundColor: ['#00B8BF', '#F4A90B'],
            data: [300, 150],
            datalabels: {
              color: '#fff'
            }
          }]
        };
        var config = {
          type: 'doughnut',
          data: data,
          //@ts-ignore
          plugins: [ChartDataLabels],
          options: {
            plugins: {
              tooltip: {
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler
              },
              datalabels: {
                formatter: function formatter(value, ctx) {
                  var datasets = ctx.chart.data.datasets;
                  var percentage;

                  if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    var sum = datasets[0].data.reduce(function (a, b) {
                      return a + b;
                    }, 0);
                    percentage = Math.round(value / sum * 100) + '%';
                    return percentage;
                  } else {
                    return percentage;
                  }
                },
                color: '#fff'
              }
            }
          }
        };
        pieChart.forEach(function (item) {
          //@ts-ignore
          new Chart(item, config);
        });
      }

      var ctx = document.querySelector('.js-mixed-chart');

      if (ctx) {
        var labels = ['第1号議案', '第2号議案', '第3号議案', '第4号議案', '第5号議案', '第6号議案', '第7号議案'];
        var chartInner = document.querySelector('.js-chart-inner');

        if (window.innerWidth > 767) {
          if (labels.length > 3) {
            chartInner.style.width = 276 * labels.length + 'px';
          }
        } else {
          if (labels.length > 2) {
            chartInner.style.width = 200 * labels.length + 'px';
          }
        } //@ts-ignore


        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: '賛成数',
              backgroundColor: ['#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF'],
              data: [3000, 3000, 3000, 3000, 3000, 3000, 3000],
              maxBarThickness: 60,
              order: 2
            }, {
              label: '反対数',
              backgroundColor: ['#FF334B', '#FF334B', '#FF334B', '#FF334B', '#FF334B', '#FF334B', '#FF334B'],
              data: [5000, 5000, 5000, 5000, 5000, 5000, 5000],
              maxBarThickness: 60,
              order: 2
            }, {
              label: '未投票数',
              backgroundColor: ['#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE'],
              data: [1000, 9500, 1000, 1000, 1000, 9500, 1000],
              maxBarThickness: 60,
              order: 2
            }, {
              label: '達成率',
              borderColor: '#F4A90B',
              backgroundColor: '#F4A90B',
              data: [13500, 12000, 16500, 13500, 12000, 16500, 13500],
              type: 'line',
              order: 1
            }]
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  boxWidth: 15
                }
              }
            },
            scales: {
              'x-axis': {
                ticks: {
                  font: {
                    weight: 600
                  }
                }
              },
              'left-y-axis': {
                type: 'linear',
                position: 'left',
                display: true,
                title: {
                  display: true,
                  text: '獲得数（票）',
                  color: '#333333',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return value;
                  }
                }
              },
              'right-y-axis': {
                type: 'linear',
                position: 'right',
                display: true,
                title: {
                  display: true,
                  text: '投票比率（%）',
                  color: '#F4A90B',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  color: '#F4A90B',
                  //@ts-ignore
                  max: _this.max,
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return (value / this.max * 100).toFixed(0) + '%';
                  }
                }
              }
            }
          }
        });
      }

      var ctx2 = document.querySelectorAll('.js-mixed-chart-2');
      ctx2.forEach(function (item) {
        if (item) {
          var _data = [{
            x: '2021/01/01 02:00',
            y: 8
          }, {
            x: '2021/01/01 12:00',
            y: 25
          }, {
            x: '2021/01/02 01:00',
            y: 22
          }, {
            x: '2021/01/02 12:00',
            y: 13
          }, {
            x: '2021/01/03 01:00',
            y: 25
          }, {
            x: '2021/01/03 12:00',
            y: 15
          }, {
            x: '2021/01/04 01:00',
            y: 8
          }, {
            x: '2021/01/04 12:00',
            y: 25
          }, {
            x: '2021/01/05 01:00',
            y: 22
          }, {
            x: '2021/01/05 12:00',
            y: 22
          }, {
            x: '2021/01/06 01:00',
            y: 22
          }, {
            x: '2021/01/07 00:00',
            y: 22
          }, {
            x: '2021/01/07 12:00',
            y: 22
          }];
          var label = 7;
          var chartInner2 = item.closest('.js-chart-inner');

          if (window.innerWidth > 767) {
            if (label > 6) {
              chartInner2.style.width = 160 * label + 'px';
            }
          } else {
            if (label > 2) {
              chartInner2.style.width = 160 * label + 'px';
            }
          } //@ts-ignore


          new Chart(item, {
            type: 'bar',
            data: {
              datasets: [{
                label: '参加登録',
                backgroundColor: '#00B8BF',
                data: _data,
                barPercentage: 0.5,
                categoryPercentage: 1,
                maxBarThickness: 14,
                order: 3
              }, {
                label: 'カレンダーでクリック',
                borderColor: '#F4A90B',
                backgroundColor: '#F4A90B',
                data: [{
                  x: '2021/01/01 00:00',
                  y: 10
                }, {
                  x: '2021/01/01 02:00',
                  y: 12
                }, {
                  x: '2021/01/01 02:00',
                  y: 5
                }, {
                  x: '2021/01/02 03:00',
                  y: 12
                }, {
                  x: '2021/01/03 04:00',
                  y: 25
                }, {
                  x: '2021/01/04 05:00',
                  y: 9
                }, {
                  x: '2021/01/05 06:00',
                  y: 14
                }, {
                  x: '2021/01/05 07:00',
                  y: 6
                }, {
                  x: '2021/01/06 08:00',
                  y: 29
                }, {
                  x: '2021/01/07 08:00',
                  y: 29
                }],
                type: 'line',
                order: 2
              }, {
                label: '検索',
                borderColor: '#9013FE',
                backgroundColor: '#9013FE',
                data: [{
                  x: '2021/01/01 00:00',
                  y: 0
                }, {
                  x: '2021/01/01 05:00',
                  y: 6
                }, {
                  x: '2021/01/01 12:00',
                  y: 3
                }, {
                  x: '2021/01/02 03:00',
                  y: 5
                }, {
                  x: '2021/01/03 04:00',
                  y: 4
                }, {
                  x: '2021/01/04 05:00',
                  y: 12
                }, {
                  x: '2021/01/05 06:00',
                  y: 3
                }, {
                  x: '2021/01/05 12:00',
                  y: 4
                }, {
                  x: '2021/01/06 08:00',
                  y: 14
                }, {
                  x: '2021/01/07 08:00',
                  y: 14
                }],
                type: 'line',
                order: 1
              }]
            },
            options: {
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    boxWidth: 15
                  }
                }
              },
              scales: {
                'x-axis': {
                  type: 'time',
                  time: {
                    tooltipFormat: 'YYYY/MM/DD',
                    unit: 'day',
                    displayFormats: {
                      day: 'YYYY/MM/DD'
                    }
                  },
                  grid: {
                    display: false
                  },
                  title: {
                    display: true
                  }
                },
                'y-axis': {
                  type: 'linear',
                  position: 'left',
                  display: true,
                  max: 30,
                  min: 0,
                  ticks: {
                    stepSize: 5,
                    callback: function callback(value, index, values) {
                      if (value % 10 === 0) {
                        return value;
                      } else {
                        return '';
                      }
                    }
                  }
                }
              }
            }
          });
        }
      });
      var bar = document.querySelector('.js-bar-chart');

      if (bar) {
        var labels2 = [['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります'], ['項目名が', '入ります']];
        var chartInner2 = document.querySelector('.js-chart-inner');

        if (window.innerWidth > 767) {
          if (labels2.length > 10) {
            chartInner2.style.width = 105 * labels2.length + 'px';
          }
        } else {
          if (labels2.length > 2) {
            chartInner2.style.width = 80 * labels2.length + 'px';
          }
        } //@ts-ignore


        new Chart(bar, {
          type: 'bar',
          data: {
            labels: labels2,
            datasets: [{
              label: '投票（議決件数）',
              backgroundColor: ['#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF', '#00B8BF'],
              data: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
              order: 2
            }, {
              label: '未投票（議決件数）',
              backgroundColor: ['#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE', '#9022FE'],
              data: [9500, 9500, 9500, 9500, 9500, 9500, 9500, 9500, 9500, 9500, 9500, 9500],
              order: 2
            }]
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  boxWidth: 15
                }
              }
            },
            scales: {
              'x-axis': {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    weight: 600
                  }
                }
              },
              'left-y-axis': {
                type: 'linear',
                position: 'left',
                display: true,
                title: {
                  display: true,
                  text: '獲得数（票）',
                  color: '#333333',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return value;
                  }
                }
              },
              'right-y-axis': {
                type: 'linear',
                position: 'right',
                display: true,
                title: {
                  display: true,
                  text: '投票比率（%）',
                  color: '#F4A90B',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  color: '#F4A90B',
                  //@ts-ignore
                  max: _this.max,
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return (value / this.max * 100).toFixed(0) + '%';
                  }
                }
              }
            }
          }
        });
      }

      var bar2 = document.querySelectorAll('.js-bar2-chart');

      if (bar2) {
        //@ts-ignore
        var config2 = {
          type: 'bar',
          data: {
            labels: ['項目名が入ります'],
            datasets: [{
              label: '投票（議決件数）',
              backgroundColor: ['#00B8BF'],
              maxBarThickness: 60,
              barPercentage: 1,
              categoryPercentage: 0.2,
              data: [3000],
              order: 2
            }, {
              label: '未投票（議決件数）',
              backgroundColor: ['#9022FE'],
              maxBarThickness: 60,
              barPercentage: 1,
              categoryPercentage: 0.2,
              data: [9500],
              order: 2
            }]
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  boxWidth: 15
                }
              }
            },
            scales: {
              'x-axis': {
                ticks: {
                  font: {
                    weight: 600
                  }
                }
              },
              'left-y-axis': {
                type: 'linear',
                position: 'left',
                display: true,
                title: {
                  display: true,
                  text: '獲得数（票）',
                  color: '#333333',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return value;
                  }
                }
              },
              'right-y-axis': {
                type: 'linear',
                position: 'right',
                display: true,
                title: {
                  display: true,
                  text: '投票比率（%）',
                  color: '#F4A90B',
                  font: {
                    size: 12
                  },
                  padding: {
                    bottom: 20
                  }
                },
                max: 20000,
                min: 0,
                ticks: {
                  color: '#F4A90B',
                  //@ts-ignore
                  max: _this.max,
                  stepSize: 2000,
                  callback: function callback(value, index, values) {
                    return (value / this.max * 100).toFixed(0) + '%';
                  }
                }
              }
            }
          }
        };
        bar2.forEach(function (item) {
          //@ts-ignore
          new Chart(item, config2);
        });
      }

      var line = document.querySelector('.js-line-chart');

      if (line) {
        var lineConfig = {
          type: 'line',
          data: {
            labels: ['', '', '', '', '', '', '', '', '', '', ''],
            datasets: [{
              label: '項目1',
              backgroundColor: ['#FF334B'],
              borderColor: ['#FF334B'],
              data: [24, 25, 26, 27, 30, 35, 37, 40, 41, 47, 53],
              order: 1
            }, {
              label: '項目2',
              backgroundColor: ['#F4A90B'],
              borderColor: ['#F4A90B'],
              data: [0, 7, 4, 13, 14, 16, 23, 26, 34, 38, 47],
              order: 1
            }, {
              label: '項目3',
              backgroundColor: ['#00B8BF'],
              borderColor: ['#00B8BF'],
              data: [15, 15, 15, 15, 18, 20, 21, 22, 33, 36, 36],
              order: 1
            }]
          },
          options: {
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0
              }
            },
            plugins: {
              legend: {
                align: 'start',
                labels: {
                  font: {
                    family: '"ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "游ゴシック", "游ゴシック体", "YuGothic", "Yu Gothic", "メイリオ", "Meiryo", "ＭＳ ゴシック", "MS Gothic", "HiraKakuProN-W3", "TakaoExゴシック", "TakaoExGothic", "MotoyaLCedar", "Droid Sans Japanese", sans-serif',
                    size: 14,
                    weight: 'bold'
                  },
                  boxWidth: 0,
                  generateLabels: function generateLabels(chart) {
                    var data = chart.data;

                    if (data.labels.length || data.datasets.length) {
                      return data.datasets.map(function (label, index) {
                        return {
                          text: label.label,
                          fontColor: label.backgroundColor,
                          index: index
                        };
                      });
                    } else {
                      return [];
                    }
                  }
                },
                onHover: function onHover(e) {
                  e.native.target.style.cursor = "pointer";
                },
                onClick: function onClick(e, legendItem, legend) {
                  var index = legendItem.index;
                  var ci = legend.chart;

                  if (ci.isDatasetVisible(index)) {
                    ci.hide(index);
                    legendItem.hidden = true;
                  } else {
                    ci.show(index);
                    legendItem.hidden = false;
                  }
                }
              }
            },
            scales: {
              'x-axis': {
                grid: {
                  color: '#F4F4F5'
                },
                ticks: {
                  font: {
                    weight: 600
                  }
                }
              },
              'left-axis': {
                type: 'linear',
                position: 'left',
                display: true,
                grid: {
                  color: '#F4F4F5'
                },
                ticks: {
                  color: '#F4F4F5',
                  stepSize: 5,
                  callback: function callback(value, index, values) {
                    return '';
                  }
                }
              }
            }
          }
        }; //@ts-ignore

        new Chart(line, lineConfig);
      }
    };

    exports.default = initializeChart;
  },{}],"js/components/toggleJsSort.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the tab content
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleJsSort = function toggleJsSort() {
      var sortButton = document.querySelectorAll('.js-sort');

      if (sortButton.length > 0) {
        sortButton.forEach(function (item) {
          item.addEventListener('click', function (e) {
            if (!(e.target instanceof HTMLImageElement)) {
              item.classList.toggle('descending');
            }
          });
        });
      }
    };

    exports.default = toggleJsSort;
  },{}],"js/components/toggleLabel.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the label in modal
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleLabel = function toggleLabel() {
      var label = document.querySelectorAll('.js-toggle');

      if (label.length > 0) {
        label.forEach(function (item) {
          item.addEventListener('click', function (e) {
            var _a;

            var elementClicked = e.target;

            if (!((_a = elementClicked.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('checkbox'))) {
              var parentElement = item.parentElement;

              if (parentElement) {
                parentElement.classList.toggle('active');
              }

              var content = item.nextElementSibling;

              if (content) {
                if (content.style.maxHeight) {
                  content.style.maxHeight = '';
                } else {
                  content.style.maxHeight = content.scrollHeight + 'px';
                }
              }
            }
          });
          window.addEventListener('resize', function () {
            label.forEach(function (item) {
              var content = item.nextElementSibling;

              if (content) {
                if (content.style.maxHeight) {
                  content.style.maxHeight = '';
                } else {
                  content.style.maxHeight = content.scrollHeight + 'px';
                }
              }
            });
          });
        });
      }
    };

    exports.default = toggleLabel;
  },{}],"js/components/toggleTab.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the tab content
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleTab = function toggleTab() {
      var tabButton = document.querySelectorAll('.js-tab-button');

      if (tabButton.length > 0) {
        tabButton.forEach(function (item) {
          item.addEventListener('click', function (event) {
            event.preventDefault();
            var active = document.querySelectorAll('.active');

            if (active.length > 0) {
              active.forEach(function (activeItem) {
                if (activeItem.classList.contains('tab__title') || activeItem.classList.contains('tab__container')) {
                  activeItem.classList.remove('active');
                }
              });
            }

            item.classList.toggle('active');
            var attributeID = item.getAttribute('href');

            if (attributeID) {
              var itemID = document.querySelector(attributeID);

              if (itemID) {
                itemID.classList.add('active');
              }
            }
          });
        });
      }
    };

    exports.default = toggleTab;
  },{}],"js/components/header.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Header
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var header = function header() {
      var header = document.querySelector('.header');
      var menu = document.querySelector('.header__menu');
      var loginNavigation = document.querySelector('.login__navigation');
      var loginHeader = document.querySelector('.login__header');
      var scrollHeader = document.querySelector('.js-header-scroll');
      var hamburger = document.querySelector('.header__hamburger');
      var dropdownS = document.querySelector('.dropdownSecondary');
      var dropdownP = document.querySelectorAll('.dropdownPrimary');
      var sublistS = document.querySelector('.header__sublist--secondary');
      var sublistP = document.querySelectorAll('.header__sublist--primary');
      var SP = window.matchMedia("(max-width: 767px)");
      var PC = window.matchMedia("(min-width: 768px)");

      if (PC.matches) {
        if (dropdownS && sublistS) {
          dropdownS === null || dropdownS === void 0 ? void 0 : dropdownS.addEventListener('mouseover', function () {
            dropdownS === null || dropdownS === void 0 ? void 0 : dropdownS.classList.add('active');
            sublistS === null || sublistS === void 0 ? void 0 : sublistS.classList.add('active');
          });
          sublistS === null || sublistS === void 0 ? void 0 : sublistS.addEventListener('mouseout', function () {
            sublistS === null || sublistS === void 0 ? void 0 : sublistS.classList.remove('active');
          });
        }
      }

      if (SP.matches) {
        if (dropdownS && sublistS) {
          dropdownS === null || dropdownS === void 0 ? void 0 : dropdownS.addEventListener('click', function () {
            dropdownS === null || dropdownS === void 0 ? void 0 : dropdownS.classList.toggle('active');
            sublistS === null || sublistS === void 0 ? void 0 : sublistS.classList.toggle('active');
          });
        }
      }

      if (PC.matches) {
        if (dropdownP && sublistP) {
          dropdownP.forEach(function (item, index) {
            item.addEventListener('mouseover', function () {
              item.classList.add('active');
              sublistP[index].classList.add('active');
              header === null || header === void 0 ? void 0 : header.classList.add('margin');
            });
            item.addEventListener('mouseout', function () {
              item.classList.remove('active');
              sublistP[index].classList.remove('active');
              header === null || header === void 0 ? void 0 : header.classList.remove('margin');
            });
          });
        }
      }

      if (SP.matches) {
        if (dropdownP && sublistP) {
          dropdownP.forEach(function (item, index) {
            item.addEventListener('click', function () {
              item.classList.toggle('active');
              sublistP[index].classList.toggle('active');
              header === null || header === void 0 ? void 0 : header.classList.add('margin');
            });
          });
        }
      }

      hamburger === null || hamburger === void 0 ? void 0 : hamburger.addEventListener('click', function () {
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle('active');
        hamburger.classList.toggle('close');
        document.body.classList.toggle('overflow');

        if (loginNavigation && loginHeader) {
          loginNavigation.classList.toggle('active');

          if (scrollHeader) {
            if (scrollHeader.classList.contains('active') && window.scrollY > 0) {
              loginHeader.classList.add('active');
            } else {
              loginHeader.classList.toggle('active');
            }
          }
        }
      });

      if (scrollHeader && loginHeader) {
        window.addEventListener('scroll', function () {
          if (window.scrollY > 0) {
            scrollHeader.classList.add('active');
          } else {
            scrollHeader.classList.remove('active');
          }
        });
      }
    };

    exports.default = header;
  },{}],"js/components/viewportFixOnMobile.ts":[function(require,module,exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Fix for viewports on mobile
     */

    var changeViewport = function changeViewport() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    };

    var viewportFixOnMobile = function viewportFixOnMobile() {
      changeViewport();
      window.addEventListener('resize', function () {
        changeViewport();
      });
    };

    exports.default = viewportFixOnMobile;
  },{}],"js/components/toggleCheckbox.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the checkbox in modal
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleCheckbox = function toggleCheckbox() {
      var toggleCheckbox = document.querySelectorAll('.js-checkbox');
      var isAllChecked = [];
      var startingIndex = [];

      if (toggleCheckbox.length > 0) {
        toggleCheckbox.forEach(function (item, index) {
          isAllChecked[index] = 0;
          startingIndex[index] = 0;
          item.addEventListener('click', function () {
            var itemElement = item.querySelector('input');

            if (itemElement) {
              var parent = item.parentElement;
              var sibling;
              var inputRadio;

              if (parent) {
                sibling = parent.nextElementSibling;

                if (sibling) {
                  inputRadio = sibling.querySelectorAll('input');
                  startingIndex[index] = 0;
                } else {
                  inputRadio = parent.querySelectorAll('input');
                  startingIndex[index] = 1;
                }
              }

              if (inputRadio && inputRadio.length > 0) {
                inputRadio.forEach(function (radioItem) {
                  if (itemElement.checked) {
                    radioItem.checked = true;

                    if (startingIndex[index] === 0) {
                      isAllChecked[index] = inputRadio.length;
                    } else {
                      isAllChecked[index] = inputRadio.length - 1;
                    }
                  } else {
                    radioItem.checked = false;
                    isAllChecked[index] = 0;
                  }
                });
              }
            }

            var checkbox = document.querySelectorAll('.js-enable-button input');
            var button = document.querySelector('.js-enable-checkbox');
            var isChecked = Array.prototype.slice.call(checkbox).some(function (x) {
              return x.checked;
            });

            if (button) {
              if (isChecked) {
                button.classList.remove('disabled');
                button.classList.add('blue');
              } else {
                button.classList.add('disabled');
                button.classList.remove('blue');
              }
            }
          });
          var itemElement = item.querySelector('input');

          if (itemElement) {
            var parent = item.parentElement;
            var sibling;
            var inputRadio;

            if (parent) {
              sibling = parent.nextElementSibling;

              if (sibling) {
                inputRadio = sibling.querySelectorAll('input');
                startingIndex[index] = 0;
              } else {
                inputRadio = parent.querySelectorAll('input');
                startingIndex[index] = 1;
              }
            }

            if (inputRadio && inputRadio.length > 0) {
              inputRadio.forEach(function (radioItem, subindex) {
                if (subindex >= startingIndex[index]) {
                  radioItem.addEventListener('click', function () {
                    if (radioItem.checked) {
                      isAllChecked[index] += 1;
                    } else {
                      isAllChecked[index] -= 1;
                    }

                    if (startingIndex[index] === 0) {
                      if (isAllChecked[index] <= inputRadio.length - 1) {
                        itemElement.checked = false;
                      } else {
                        itemElement.checked = true;
                      }
                    } else {
                      if (isAllChecked[index] < inputRadio.length - 1) {
                        itemElement.checked = false;
                      } else {
                        itemElement.checked = true;
                      }
                    }
                  });
                }
              });
            }
          }
        });
      }
    };

    exports.default = toggleCheckbox;
  },{}],"js/components/limitInputModalTextarea.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Limits the input of modal textarea
     * Only allows numbers, commas, and newlines
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function setInputFilter(textbox, inputFilter) {
      ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;

            if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          } else {
            this.value = '';
          }
        });
      });
    }

    var limitInputModalTextarea = function limitInputModalTextarea() {
      var inputTextarea = document.querySelector('.modal__textarea');
      var inputNumber = document.querySelectorAll('input[type="number"]');
      var inputDate = document.querySelectorAll('.input__date'); // let emailOnly = document.querySelectorAll('.js-email-only')

      if (inputTextarea) {
        setInputFilter(inputTextarea, function (value) {
          return /^[0-9,\r\n]*$/.test(value);
        });
      }

      if (inputNumber.length > 0) {
        inputNumber.forEach(function (item) {
          var itemElement = item;
          itemElement.type = 'text';
          if (itemElement.classList.contains('number-input')) {
            setInputFilter(item, function (value) {
              return /^-?[0-9]*$/.test(value);
            });
          } else {
            setInputFilter(item, function (value) {
              return /^[0-9]*$/.test(value);
            });
          }
        });
      }

      if (inputDate.length > 0) {
        inputDate.forEach(function (item) {
          setInputFilter(item, function (value) {
            return /^[0-9/]*$/.test(value);
          });
        });
      } // if(emailOnly.length > 0) {
      //   emailOnly.forEach(item => {
      //     setInputFilter(item, value => {
      //       return /^[0-9a-zA-Z_-]*$/.test(value)
      //     })
      //   })
      // }

    };

    exports.default = limitInputModalTextarea;
  },{}],"js/components/resizeTextarea.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Resizes the textarea based on text content
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var resizeTextarea = function resizeTextarea() {
      var textarea = document.querySelectorAll('.js-auto-resize');
      var initTextarea = document.querySelectorAll('.js-init-resize');

      if (textarea.length > 0) {
        textarea.forEach(function (item) {
          var itemElement = item;
          item.setAttribute('style', 'height:' + window.getComputedStyle(item).getPropertyValue('min-height') + ';overflow-y:hidden;');
          item.addEventListener('input', function () {
            itemElement.style.height = 'auto';
            itemElement.style.height = itemElement.scrollHeight + 'px';
          });
        });
      }

      if (initTextarea.length > 0) {
        textarea.forEach(function (item) {
          item.setAttribute('style', 'height:' + item.scrollHeight + 'px;overflow-y:hidden;');
        });
      }
    };

    exports.default = resizeTextarea;
  },{}],"js/components/flexibleContent.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Adds flexible content ui functionality
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function setInputFilter(textbox, inputFilter) {
      ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;

            if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          } else {
            this.value = '';
          }
        });
      });
    }

    var getDuplicateContent = function getDuplicateContent(subcontent, content, labelString, noParenthesis, secondLabelString) {
      if (subcontent.length > 0) {
        subcontent.forEach(function (subcontentItem) {
          var addButton = subcontentItem.querySelector('.js-add-ss');
          var label = subcontentItem.querySelectorAll('.js-label-ss');
          var secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
          var deleteButton = subcontentItem.querySelectorAll('.js-delete-ss');
          var hasNumItems = subcontentItem.classList.contains('js-personal-data-count');
          var isPersonalData = subcontentItem.classList.contains('js-personal-data') || subcontentItem.classList.contains('js-personal-data-count')

          if (deleteButton.length > 0) {
            deleteButton.forEach(function (deleteItem) {
              deleteItem.addEventListener('click', function () {
                var deleteParent = deleteItem.closest('.js-duplicate');

                var closeBtns = [...document.getElementsByClassName("close-ct")]
                closeBtns.forEach(btn => btn.addEventListener("click", () => {
                  deleteParent = null
                }))

                if (deleteParent) {
                  if (isPersonalData) {
                    $('.btn-submit-ct').click(function () {
                      deleteParent && deleteParent.remove();
                      hideIndex();
                    })
                  } else {
                    deleteParent && deleteParent.remove();
                    hideIndex();
                  }
                  if (hasNumItems) {
                    $('.btn-submit-ct').click(function () {
                      deleteParent && deleteParent.remove();
                      // var numItems = subcontentItem.querySelectorAll('.form__select-duplicate');
                      // subcontentItem.parentNode.querySelector('.count').innerHTML = numItems.length;
                      hideIndex();
                    })
                  }
                }

                label = subcontentItem.querySelectorAll('.js-label-ss');
                secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
                label.forEach(function (labelItem, labelIndex) {
                  if (isPersonalData) {
                    if (noParenthesis) {
                      labelItem.innerHTML = labelString;
                    } else {
                      labelItem.innerHTML = labelString;
                    }
                  } else {
                    if (noParenthesis) {
                      labelItem.innerHTML = labelString + (labelIndex + 1);
                    } else {
                      labelItem.innerHTML = labelString + '(' + (labelIndex + 1) + ')';
                    }
                  }

                  if (secondLabel[labelIndex]) {
                    secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                  }
                });

                function hideIndex(){
                  var currentDelete = subcontentItem.querySelectorAll('.js-delete-ss');
                  if (currentDelete.length === 1) {
                    currentDelete.forEach(function (item) {
                      item.classList.add('hide');
                    });
                  }
                }
              });
            });
          }

          if (addButton) {
            addButton.addEventListener('click', function () {
              const container = $(addButton).parent()[0]
              const parent1 = $(container).parent()[0]
              
              let deleteItem = null
              let parent = null
              var html = addButton.parentElement.previousElementSibling.querySelector('.js-duplicate').innerHTML;
              var clone = document.createElement('div');
              var deleteButtonFirst = subcontentItem.querySelector('.js-delete-ss');

              if (isPersonalData) {
                deleteButtonFirst.classList.remove('hide');
              }

              if (clone && content) {
                content.appendChild(clone);
                clone.classList.add('form__select-duplicate');
                clone.classList.add('js-duplicate');
                clone.innerHTML = html;
                var deleteClone = clone.querySelector('.js-delete-ss');
                var inputNumber = clone.querySelectorAll('.js-input-number');
                var inputName = clone.querySelectorAll('.has-name');
                var inputs = clone.querySelectorAll('input, textarea');

                deleteButton = subcontentItem.querySelectorAll('.js-delete-ss');
                deleteButton.forEach(function (item) {
                  item.classList.remove('hide');
                  item.addEventListener("click", () => {
                    deleteItem = item.closest(".form__subitem")
                    parent = deleteItem.closest(".js-personal-data-count")
                  })
                });

                if (parent1.classList.contains("js-personal-data-count")) {
                  const numItems1 = $(parent1).find(".form__subitem")
                  $(parent1).prev()[0].innerHTML = `<span class="count">${numItems1.length}</span>回`
                }

                if (inputNumber.length > 0) {
                  inputNumber.forEach(function (item) {
                    var itemElement = item;
                    itemElement.type = 'text';
                    setInputFilter(item, function (value) {
                      return /^[0-9]*$/.test(value);
                    });
                  });
                }

                inputs.forEach(function (inputItem) {
                  if (!(inputItem.getAttribute('type') === 'radio')) {
                    inputItem.value = '';
                  }
                });

                if (inputName.length > 0) {
                  inputName.forEach(function (item) {
                    item.classList.remove('has-name');
                    item.classList.add('has-subname');
                  });
                }

                if (deleteClone) {
                  deleteClone.classList.remove('hide');
                  deleteClone.addEventListener('click', function () {
                    if (clone) {
                      if (isPersonalData) {
                        $('.btn-submit-ct').click(function () {
                          // clone.remove();
                          deleteItem && deleteItem.remove()
                          hideIndex();
                        })
                      } else {
                        clone.remove();
                        hideIndex();
                      } 
                      if (hasNumItems) {
                        $('.btn-submit-ct').click(function () {
                          deleteItem && deleteItem.remove()

                          if (parent) {
                            const numItems = $(parent).find(".form__subitem")
                            $(parent).prev()[0].innerHTML = `<span class="count">${numItems.length}</span>回`
                          }
                          hideIndex();
                        })
                      }
                    }

                    label = subcontentItem.querySelectorAll('.js-label-ss');
                    secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
                    label.forEach(function (labelItem, labelIndex) {
                      if (isPersonalData) {
                        if (noParenthesis) {
                          labelItem.innerHTML = labelString;
                        } else {
                          labelItem.innerHTML = labelString;
                        }
                      } else {
                        if (noParenthesis) {
                          labelItem.innerHTML = labelString + (labelIndex + 1);
                        } else {
                          labelItem.innerHTML = labelString + '(' + (labelIndex + 1) + ')';
                        }
                      }

                      if (secondLabel[labelIndex]) {
                        secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                      }
                    });
                    function hideIndex(){
                      var currentDelete = subcontentItem.querySelectorAll('.js-delete-ss');

                      if (currentDelete.length === 1) {
                        currentDelete.forEach(function (item) {
                          item.classList.add('hide');
                        });
                      }
                    }

                    if (hasDuplicatedName) {
                      var mainParent = content[subcontentIndex].querySelectorAll('.js-duplicate');
                      mainParent.forEach(function (cloneItem, cloneIndex) {
                        var inputs = cloneItem.querySelectorAll('.has-name');
                        inputs.forEach(function (inputItem, inputIndex) {
                          inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                        });
                      });
                    }
                  });
                }

              }

              label = subcontentItem.querySelectorAll('.js-label-ss');
              secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
              label.forEach(function (labelItem, labelIndex) {
                if (isPersonalData) {
                  if (noParenthesis) {
                    labelItem.innerHTML = labelString;
                  } else {
                    labelItem.innerHTML = labelString;
                  }
                } else {
                  if (noParenthesis) {
                    labelItem.innerHTML = labelString + (labelIndex + 1);
                  } else {
                    labelItem.innerHTML = labelString + '(' + (labelIndex + 1) + ')';
                  }
                }

                if (secondLabel[labelIndex]) {
                  secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                }
              });
            });
          }
        });
      }
    };

    var getFlexibleContent = function getFlexibleContent(subcontent, isBill, mainLabel) {
      var indexInput = [];

      if (subcontent.length > 0) {
        subcontent.forEach(function (subcontentItem, subcontentIndex) {
          var cloneParent = subcontentItem.querySelector('.js-clone-parent');
          var addButton = subcontentItem.querySelector('.js-add-content');
          var content = subcontentItem.querySelector('.js-clone-content');
          var deleteButton = subcontentItem.querySelectorAll('.js-delete-content');
          var label = subcontentItem.querySelectorAll('.js-label');
          indexInput[subcontentIndex] = 1;
          var html = content.innerHTML;
          var inputClones = [];

          if (addButton && content && deleteButton) {
            addButton.addEventListener('click', function () {
              var clone = document.createElement('div');

              if (clone && cloneParent) {
                clone.classList.add('subcontent__draggable');
                clone.classList.add('js-clone-content');
                clone.innerHTML = html;
                var subitem = clone.querySelectorAll('.js-subitem');
                var formSelectContainer = clone.querySelectorAll('.form__select-container');
                var select = clone.querySelectorAll('select');
                var show = clone.querySelectorAll('.show');

                if (subitem.length > 1) {
                  subitem.forEach(function (item, index) {
                    if (index > 0) {
                      item.remove();
                    }
                  });
                }

                if (formSelectContainer.length > 0) {
                  formSelectContainer.forEach(function (item) {
                    var jsDuplicate = item.querySelectorAll('.js-duplicate');

                    if (jsDuplicate.length > 1) {
                      jsDuplicate.forEach(function (duplicateItem, index) {
                        if (index > 0) {
                          duplicateItem.remove();
                        }
                      });
                    }
                  });
                }

                if (select.length > 0) {
                  select.forEach(function (item) {
                    var selectElement = item;
                    selectElement.selectedIndex = 0;
                    selectElement.classList.add('gray');
                    item.addEventListener('change', function () {
                      selectElement.classList.remove('gray');
                    });
                  });
                }

                if (show.length > 0) {
                  show.forEach(function (item) {
                    item.classList.add('hide');
                    item.classList.remove('show');
                  });
                }

                var question = clone.querySelectorAll('.question');

                if (question.length > 0) {
                  question.forEach(function (questionItem) {
                    questionItem.classList.add('hide');
                  });
                }

                var inputs = clone.querySelectorAll('input, textarea');
                var deleteClone = clone.querySelector('.js-delete-content');
                var autoResize = clone.querySelectorAll('.js-auto-resize');
                var inputNumber = clone.querySelectorAll('.js-input-number');
                indexInput[subcontentIndex] = indexInput[subcontentIndex] + 1;
                var radioClone = clone.querySelectorAll('.js-candidate-toggle');
                var contentClone = clone.querySelector('.js-candidate-content');
                var subcontentSelection = clone.querySelectorAll('.js-single-selection');
                var contentSelection = clone.querySelector('.js-content-ss');
                getDuplicateContent(subcontentSelection, contentSelection, '回答選択肢 ', false, '選択肢遷移先 ');
                var subcontentMultipleSelection = clone.querySelectorAll('.js-multiple-selection');
                var contentMultipleSelection = clone.querySelector('.js-content-ms');
                getDuplicateContent(subcontentMultipleSelection, contentMultipleSelection, '回答選択肢 ');
                var subcontentSingleFreeInput = clone.querySelectorAll('.js-single-selection-free-input');
                var contentSingleFreeInput = clone.querySelector('.js-content-ssfi');
                getDuplicateContent(subcontentSingleFreeInput, contentSingleFreeInput, '回答選択肢 ', false, '選択肢遷移先 ');
                var subcontentMultipleFreeInput = clone.querySelectorAll('.js-multiple-selection-free-input');
                var contentMultipleFreeInput = clone.querySelector('.js-content-msfi');
                getDuplicateContent(subcontentMultipleFreeInput, contentMultipleFreeInput, '回答選択肢 ');
                var subcontentMatrixSingleSelection = clone.querySelectorAll('.js-matrix-single-selection');
                var contentMatrixSingleSelection = clone.querySelector('.js-content-mss');
                getDuplicateContent(subcontentMatrixSingleSelection, contentMatrixSingleSelection, '回答選択肢 ');
                var subcontentSingleSelectionChild = clone.querySelectorAll('.js-single-selection-child');
                var contentSingleSelectionChild = clone.querySelector('.js-content-ssc');
                getDuplicateContent(subcontentSingleSelectionChild, contentSingleSelectionChild, '回答選択肢 ');
                var subcontentDuplicate = clone.querySelectorAll('.js-personal-data');
                var contentDuplicate = clone.querySelector('.js-content-personal-data');
                getDuplicateContent(subcontentDuplicate, contentDuplicate, '取扱ファンド ');
                var subcontentSingleInput = clone.querySelectorAll('.js-personal-data-count');
                var contentSingleInput = clone.querySelector('.js-content-personal-data-count');
                getDuplicateContent(subcontentSingleInput, contentSingleInput, 'コンタクト履歴 ');

                if (autoResize.length > 0) {
                  autoResize.forEach(function (item) {
                    var itemElement = item;
                    item.addEventListener('input', function () {
                      itemElement.style.height = window.getComputedStyle(item).getPropertyValue('min-height');
                    });
                  });
                }

                if (inputNumber.length > 0) {
                  inputNumber.forEach(function (item) {
                    var itemElement = item;
                    itemElement.type = 'text';
                    setInputFilter(item, function (value) {
                      return /^[0-9]*$/.test(value);
                    });
                  });
                }

                var index = 0;
                inputs.forEach(function (inputItem) {
                  if (!(inputItem.getAttribute('type') === 'radio')) {
                    inputItem.value = '';
                  }

                  if (inputItem.name) {
                    inputClones[index] = inputItem.name;
                    inputItem.classList.add('has-name');
                    inputItem.name = '';
                    index = index + 1;
                  }
                });

                if (deleteClone) {
                  deleteClone.addEventListener('click', function () {
                    if (clone) {
                      clone.remove();
                    }

                    label = subcontentItem.querySelectorAll('.js-label');
                    label.forEach(function (labelItem, labelIndex) {
                      if (mainLabel) {
                        labelItem.innerHTML = mainLabel + (labelIndex + 1);
                      } else {
                        labelItem.innerHTML = '第' + (labelIndex + 1) + '号議案';
                      }
                    });
                    var mainParent = subcontentItem.querySelectorAll('.js-clone-content');
                    mainParent.forEach(function (cloneItem, cloneIndex) {
                      var inputs = cloneItem.querySelectorAll('.has-name');
                      inputs.forEach(function (inputItem, inputIndex) {
                        inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                      var inputFlexibleName = cloneItem.querySelectorAll('.flexible-name');
                      inputFlexibleName.forEach(function (inputItem) {
                        inputItem.name = inputItem.name.replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                    });
                  });
                }

                if (radioClone && contentClone) {
                  radioClone.forEach(function (item) {
                    item.addEventListener('click', function () {
                      var itemElement = item;

                      if (itemElement.value === '設定する') {
                        contentClone.classList.add('active');
                      } else {
                        contentClone.classList.remove('active');
                      }
                    });
                  });
                }

                cloneParent.appendChild(clone);
              }

              label = subcontentItem.querySelectorAll('.js-label');
              var duplicateContent = subcontentItem.querySelectorAll('.js-duplicate-content');
              var limit = subcontentItem.dataset.limit;
              label.forEach(function (labelItem, labelIndex) {
                if (mainLabel) {
                  labelItem.innerHTML = mainLabel + (labelIndex + 1);
                } else {
                  labelItem.innerHTML = '第' + (labelIndex + 1) + '号議案';
                }

                if (labelIndex + 1 >= limit) {
                  addButton.classList.add('hide');
                } else {
                  addButton.classList.remove('hide');
                }

                duplicateContent.forEach(function (duplicateItem) {
                  if (labelIndex + 1 >= limit) {
                    duplicateItem.classList.add('hide');
                  } else {
                    duplicateItem.classList.remove('hide');
                  }
                });
              });
              var mainParent = subcontentItem.querySelectorAll('.js-clone-content');
              mainParent.forEach(function (cloneItem, cloneIndex) {
                var inputs = cloneItem.querySelectorAll('.has-name');
                inputs.forEach(function (inputItem, inputIndex) {
                  inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                });
              });
            });

            if (deleteButton.length > 0) {
              deleteButton.forEach(function (deleteItem) {
                deleteItem.addEventListener('click', function () {
                  var parent = deleteItem.closest('.js-subitem');
                  var mainParent = deleteItem.closest('.js-candidate-forms');

                  if (!mainParent) {
                    mainParent = deleteItem.closest('.form__select-content');
                  }

                  if (parent) {
                    parent.remove();
                    var subLabel = mainParent.querySelectorAll('.js-candidate-label');
                    var secondLabel = mainParent.querySelectorAll('.js-second-candidate-label');
                    subLabel.forEach(function (labelItem, labelIndex) {
                      labelItem.innerHTML = '候補者名' + (labelIndex + 1);
                      secondLabel[labelIndex].innerHTML = '候補者番号' + (labelIndex + 1);
                    });
                  } else {
                    parent = deleteItem.closest('.js-clone-content');
                    parent.remove();
                    label = subcontentItem.querySelectorAll('.js-label');
                    label.forEach(function (labelItem, labelIndex) {
                      if (mainLabel) {
                        labelItem.innerHTML = mainLabel + (labelIndex + 1);
                      } else {
                        labelItem.innerHTML = '第' + (labelIndex + 1) + '号議案';
                      }
                    });

                    var _mainParent = subcontentItem.querySelectorAll('.js-clone-content');

                    _mainParent.forEach(function (cloneItem, cloneIndex) {
                      var inputs = cloneItem.querySelectorAll('.has-name');
                      inputs.forEach(function (inputItem, inputIndex) {
                        inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                    });
                  }
                });
              });
            }
          }

          var parentDuplicated = subcontentItem.querySelector('.js-clone-parent');
          inputClones = [];

          if (parentDuplicated) {
            parentDuplicated.addEventListener('click', function (event) {
              var _a;

              var clickedElement = event.target;

              if (clickedElement) {
                if (clickedElement.getAttribute('type') === 'radio') {
                  var checkedElement = (_a = clickedElement.closest('.form__input-subwrap')) === null || _a === void 0 ? void 0 : _a.querySelector('.js-checked');
                  checkedElement === null || checkedElement === void 0 ? void 0 : checkedElement.classList.remove('js-checked');
                  clickedElement.classList.add('js-checked');
                }

                if (clickedElement.classList.contains('js-duplicate-content')) {
                  var parentClickedElement = clickedElement.closest('.js-clone-content');

                  if (parentClickedElement) {
                    var clone = parentClickedElement.cloneNode(true);
                    var inputs = clone.querySelectorAll('.has-name');
                    var deleteClone = clone.querySelector('.js-delete-content');
                    var autoResize = clone.querySelectorAll('.js-auto-resize');
                    var questions = clone.querySelectorAll('.question');
                    var candidateForm = clone.querySelector('.js-candidate-forms');

                    var _deleteButton;

                    var selectParent = parentClickedElement.querySelectorAll('select');
                    var selectChild = clone.querySelectorAll('select');

                    if (selectParent.length > 0) {
                      selectParent.forEach(function (selectItem, selectIndex) {
                        var selectElement = selectItem;
                        selectChild[selectIndex].value = selectElement.value;
                      });
                    }

                    if (candidateForm) {
                      _deleteButton = candidateForm.querySelectorAll('.js-delete-content');
                    } else {
                      _deleteButton = clone.querySelectorAll('.js-delete-ss');
                    }

                    var inputNumberDuplicate = clone.querySelectorAll('.js-input-number');
                    var radioClone = clone.querySelectorAll('.js-candidate-toggle');
                    var contentClone = clone.querySelector('.js-candidate-content');
                    var subcontentSelection = clone.querySelectorAll('.js-single-selection');
                    var contentSelection = clone.querySelector('.js-content-ss');
                    getDuplicateContent(subcontentSelection, contentSelection, '回答選択肢 ', false, '選択肢遷移先 ');
                    var subcontentMultipleSelection = clone.querySelectorAll('.js-multiple-selection');
                    var contentMultipleSelection = clone.querySelector('.js-content-ms');
                    getDuplicateContent(subcontentMultipleSelection, contentMultipleSelection, '回答選択肢 ');
                    var subcontentSingleFreeInput = clone.querySelectorAll('.js-single-selection-free-input');
                    var contentSingleFreeInput = clone.querySelector('.js-content-ssfi');
                    getDuplicateContent(subcontentSingleFreeInput, contentSingleFreeInput, '回答選択肢 ', false, '選択肢遷移先 ');
                    var subcontentMultipleFreeInput = clone.querySelectorAll('.js-multiple-selection-free-input');
                    var contentMultipleFreeInput = clone.querySelector('.js-content-msfi');
                    getDuplicateContent(subcontentMultipleFreeInput, contentMultipleFreeInput, '回答選択肢 ');
                    var subcontentMatrixSingleSelection = clone.querySelectorAll('.js-matrix-single-selection');
                    var contentMatrixSingleSelection = clone.querySelector('.js-content-mss');
                    getDuplicateContent(subcontentMatrixSingleSelection, contentMatrixSingleSelection, '回答選択肢 ');
                    var subcontentSingleSelectionChild = clone.querySelectorAll('.js-single-selection-child');
                    var contentSingleSelectionChild = clone.querySelector('.js-content-ssc');
                    getDuplicateContent(subcontentSingleSelectionChild, contentSingleSelectionChild, '回答選択肢 ');
                    var subcontentDuplicate = clone.querySelectorAll('.js-personal-data');
                    var contentDuplicate = clone.querySelector('.js-content-personal-data');
                    getDuplicateContent(subcontentDuplicate, contentDuplicate, '取扱ファンド ');
                    var subcontentSingleInput = clone.querySelectorAll('.js-personal-data-count');
                    var contentSingleInput = clone.querySelector('.js-content-personal-data-count');
                    getDuplicateContent(subcontentSingleInput, contentSingleInput, 'コンタクト履歴 ');

                    var index = 0;
                    inputs.forEach(function (inputItem) {
                      if (inputItem.name) {
                        inputClones[index] = inputItem.name;
                        inputItem.classList.add('has-name');
                        inputItem.name = '';
                        index = index + 1;
                      }
                    });

                    if (inputNumberDuplicate.length > 0) {
                      inputNumberDuplicate.forEach(function (item) {
                        var itemElement = item;
                        itemElement.type = 'text';
                        setInputFilter(item, function (value) {
                          return /^[0-9]*$/.test(value);
                        });
                      });
                    }

                    var mainParentClone1 = subcontentItem.querySelectorAll('.js-clone-content');
                    mainParentClone1.forEach(function (cloneItem, cloneIndex) {
                      var inputs = cloneItem.querySelectorAll('.has-name');
                      inputs.forEach(function (inputItem, inputIndex) {
                        inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                    });

                    if (autoResize.length > 0) {
                      autoResize.forEach(function (item) {
                        item.addEventListener('input', function () {
                          item.style.height = window.getComputedStyle(item).getPropertyValue('min-height');
                        });
                      });
                    }

                    if (questions.length > 0) {
                      questions.forEach(function (itemQuestion) {
                        itemQuestion.classList.add('hide');
                      });
                    }

                    if (deleteClone) {
                      deleteClone.addEventListener('click', function () {
                        if (clone) {
                          clone.remove();
                        }

                        label = subcontentItem.querySelectorAll('.js-label');
                        var duplicateContent = subcontentItem.querySelectorAll('.js-duplicate-content');
                        var limit = subcontentItem.dataset.limit;
                        label.forEach(function (labelItem, labelIndex) {
                          if (mainLabel) {
                            labelItem.innerHTML = mainLabel + (labelIndex + 1);
                          } else {
                            labelItem.innerHTML = '第' + (labelIndex + 1) + '号議案';
                          }

                          if (labelIndex + 1 >= limit) {
                            addButton.classList.add('hide');
                          } else {
                            addButton.classList.remove('hide');
                          }

                          duplicateContent.forEach(function (duplicateItem) {
                            if (labelIndex + 1 >= limit) {
                              duplicateItem.classList.add('hide');
                            } else {
                              duplicateItem.classList.remove('hide');
                            }
                          });
                        });
                        var mainParentClone2 = subcontentItem.querySelectorAll('.js-clone-content');
                        mainParentClone2.forEach(function (cloneItem, cloneIndex) {
                          var inputs = cloneItem.querySelectorAll('.has-name');
                          inputs.forEach(function (inputItem, inputIndex) {
                            inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                          });
                        });
                      });
                    }

                    if (radioClone && contentClone) {
                      radioClone.forEach(function (item) {
                        item.addEventListener('click', function () {
                          var itemElement = item;

                          if (itemElement.value === '設定する') {
                            contentClone.classList.add('active');
                          } else {
                            contentClone.classList.remove('active');
                          }
                        });
                      });
                    }

                    parentClickedElement.after(clone);
                    label = subcontentItem.querySelectorAll('.js-label');
                    var duplicateContent = subcontentItem.querySelectorAll('.js-duplicate-content');
                    var limit = subcontentItem.dataset.limit;
                    label.forEach(function (labelItem, labelIndex) {
                      if (mainLabel) {
                        labelItem.innerHTML = mainLabel + (labelIndex + 1);
                      } else {
                        labelItem.innerHTML = '第' + (labelIndex + 1) + '号議案';
                      }

                      if (labelIndex + 1 >= limit) {
                        addButton.classList.add('hide');
                      } else {
                        addButton.classList.remove('hide');
                      }

                      duplicateContent.forEach(function (duplicateItem) {
                        if (labelIndex + 1 >= limit) {
                          duplicateItem.classList.add('hide');
                        } else {
                          duplicateItem.classList.remove('hide');
                        }
                      });
                    });
                    var getRadioButton = subcontentItem.querySelectorAll('input[type="radio"]');
                    var itemElementChecked = [];
                    var indexChecked = 0;
                    getRadioButton.forEach(function (item) {
                      var itemElement = item;

                      if (itemElement.checked) {
                        itemElementChecked[indexChecked] = itemElement;
                        indexChecked = indexChecked + 1;
                      }
                    });
                    var mainParentClone = subcontentItem.querySelectorAll('.js-clone-content');
                    mainParentClone.forEach(function (cloneItem, cloneIndex) {
                      var inputs = cloneItem.querySelectorAll('.has-name');
                      var inputSub = cloneItem.querySelectorAll('.has-subname');
                      var flexibleName = cloneItem.querySelectorAll('.flexible-name');
                      inputs.forEach(function (inputItem, inputIndex) {
                        inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                      inputSub.forEach(function (inputItem) {
                        inputItem.name = inputItem.name.replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                      flexibleName.forEach(function (inputItem) {
                        inputItem.name = inputItem.name.replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                      });
                    });
                    itemElementChecked.forEach(function (itemElement) {
                      itemElement.checked = true;
                    });

                    if (_deleteButton) {
                      var deleteButtonCurrent = _deleteButton[0].closest('.js-candidate-forms');

                      if (!deleteButtonCurrent) {
                        deleteButtonCurrent = _deleteButton[0].closest('.form__select-content');
                      }

                      _deleteButton.forEach(function (item) {
                        item.addEventListener('click', function () {
                          var parent = item.closest('.js-subitem');

                          if (!parent) {
                            parent = item.closest('.js-duplicate');
                          }

                          parent.remove();
                          var mainDeleteParent = deleteButtonCurrent.querySelectorAll('.js-candidate-label');
                          var mainDeleteParentSecond = deleteButtonCurrent.querySelectorAll('.js-second-candidate-label');

                          if (mainDeleteParent.length <= 0) {
                            mainDeleteParent = deleteButtonCurrent.querySelectorAll('.js-label-ss');
                            mainDeleteParentSecond = deleteButtonCurrent.querySelectorAll('.js-label-second-ss');
                          }

                          mainDeleteParent.forEach(function (itemDelete, indexDelete) {
                            itemDelete.innerHTML = itemDelete.innerHTML.replace(/(\d+)(?!.*\d)/g, String(indexDelete + 1));
                          });

                          if (mainDeleteParentSecond) {
                            mainDeleteParentSecond.forEach(function (itemDelete, indexDelete) {
                              itemDelete.innerHTML = itemDelete.innerHTML.replace(/(\d+)(?!.*\d)/g, String(indexDelete + 1));
                            });
                          }
                        });
                      });
                    }
                  }
                }
              }
            });
          }
        });
      }
    };

    var flexibleContent = function flexibleContent() {
      var subcontent = document.querySelectorAll('.js-subcontent');
      var subcontentBill = document.querySelectorAll('.js-bill');
      var mainLabel = '質問 ';

      if (subcontent) {
        getFlexibleContent(subcontent);
        getFlexibleContent(subcontentBill, true, mainLabel);
      }
    };

    exports.default = flexibleContent;
  },{}],"js/components/toggleCandidateRadio.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the candidate name input on radio checked
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleCandidateRadio = function toggleCandidateRadio() {
      var subcontent = document.querySelectorAll('.js-subcontent');

      if (subcontent.length > 0) {
        subcontent.forEach(function (itemContent) {
          var radio = itemContent.querySelectorAll('.js-candidate-toggle');

          if (radio) {
            radio.forEach(function (item) {
              var _a;

              var content = (_a = item.closest('.js-clone-content')) === null || _a === void 0 ? void 0 : _a.querySelector('.js-candidate-content');

              if (!content) {
                content = itemContent.querySelector('.js-candidate-content');
              }

              item.addEventListener('click', function () {
                var itemElement = item;

                if (itemElement.value === '設定する' || itemElement.value === '対応する') {
                  content === null || content === void 0 ? void 0 : content.classList.add('active');
                } else {
                  content === null || content === void 0 ? void 0 : content.classList.remove('active');
                }
              });
            });
          }
        });
      } else {
        var radio = document.querySelectorAll('.js-candidate-toggle');
        var content = document.querySelector('.js-candidate-content');

        if (radio && content) {
          radio.forEach(function (item) {
            item.addEventListener('click', function () {
              var itemElement = item;

              if (itemElement.value === '設定する' || itemElement.value === '対応する') {
                content.classList.add('active');
              } else {
                content.classList.remove('active');
              }
            });
          });
        }
      }
    };

    exports.default = toggleCandidateRadio;
  },{}],"js/components/addCandidate.ts":[function(require,module,exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Adds and delete candidate names
     */

    function setInputFilter(textbox, inputFilter) {
      ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;

            if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          } else {
            this.value = '';
          }
        });
      });
    }

    var addCandidate = function addCandidate() {
      var subcontent = document.querySelectorAll('.js-subcontent');

      if (subcontent.length > 0) {
        subcontent.forEach(function (subcontentItem) {
          subcontentItem.addEventListener('click', function (event) {
            var clickedElement = event.target;

            if (clickedElement.classList.contains('js-add-proposal')) {
              var addButton = clickedElement;
              var parentElement = clickedElement.closest('.js-clone-content');

              if (parentElement) {
                var content = parentElement.querySelector('.js-candidate-forms');
                var subitem = parentElement.querySelector('.js-subitem');
                var label = parentElement.querySelectorAll('.js-candidate-label');
                var secondLabel = parentElement.querySelectorAll('.js-second-candidate-label');
                var html = String(subitem === null || subitem === void 0 ? void 0 : subitem.innerHTML);

                if (addButton) {
                  var clone = document.createElement('div');

                  if (clone && content) {
                    clone.classList.add('form__subitem');
                    clone.classList.add('js-subitem');
                    clone.innerHTML = html;
                    var deleteClone = clone.querySelector('.js-delete-content');
                    var inputNumber = clone.querySelectorAll('.js-input-number');

                    if (inputNumber.length > 0) {
                      inputNumber.forEach(function (item) {
                        var itemElement = item;
                        itemElement.type = 'text';
                        setInputFilter(item, function (value) {
                          return /^[0-9]*$/.test(value);
                        });
                      });
                    }

                    var inputs = clone.querySelectorAll('input, textarea');
                    inputs.forEach(function (inputItem) {
                      var inputElement = inputItem;

                      if (!(inputItem.getAttribute('type') === 'radio')) {
                        inputElement.value = '';
                      }

                      inputItem.classList.remove('has-name');
                      inputItem.classList.add('flexible-name');
                    });

                    if (deleteClone) {
                      deleteClone.classList.remove('hide');
                      deleteClone.addEventListener('click', function () {
                        if (clone) {
                          clone.remove();
                        }

                        if (parentElement) {
                          label = parentElement.querySelectorAll('.js-candidate-label');
                          secondLabel = parentElement.querySelectorAll('.js-second-candidate-label');
                          label.forEach(function (labelItem, labelIndex) {
                            labelItem.innerHTML = '候補者名' + (labelIndex + 1);
                            secondLabel[labelIndex].innerHTML = '候補者番号' + (labelIndex + 1);
                          });
                        }
                      });
                    }

                    content.appendChild(clone);
                  }

                  if (parentElement && content) {
                    label = parentElement.querySelectorAll('.js-candidate-label');
                    secondLabel = parentElement.querySelectorAll('.js-second-candidate-label');
                    label.forEach(function (labelItem, labelIndex) {
                      labelItem.innerHTML = '候補者名' + (labelIndex + 1);
                      secondLabel[labelIndex].innerHTML = '候補者番号' + (labelIndex + 1);
                    });
                  }
                }
              }
            }
          });
        });
      }
    };

    exports.default = addCandidate;
  },{}],"js/components/toggleRadio.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the radio content
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleRadio = function toggleRadio() {
      var subcontent = document.querySelectorAll('.js-tab-content');
      subcontent.forEach(function (subcontentItem) {
        var advanceRadio = subcontentItem.querySelectorAll('.js-advance-toggle');
        var advanceContent = subcontentItem.querySelectorAll('.js-advance-wrapper');

        if (advanceRadio.length > 0 && advanceContent.length > 0) {
          advanceRadio.forEach(function (item) {
            item.addEventListener('click', function () {
              var itemElement = item;

              if (itemElement.value === '利用する') {
                for (var x = 0; x < advanceContent.length; x++) {
                  advanceContent[x].classList.add('display');
                }
              } else {
                for (var x = 0; x < advanceContent.length; x++) {
                  advanceContent[x].classList.remove('display');
                }
              }
            });
          });
        }

        var receivingRadio = subcontentItem.querySelectorAll('.js-receiving-toggle');
        var receivingContent = subcontentItem.querySelectorAll('.js-receiving-wrapper');

        if (receivingRadio.length > 0 && receivingContent.length > 0) {
          receivingRadio.forEach(function (item) {
            item.addEventListener('click', function () {
              var itemElement = item;

              if (itemElement.value === '利用する') {
                for (var x = 0; x < receivingContent.length; x++) {
                  receivingContent[x].classList.add('display');
                }
              } else {
                for (var x = 0; x < receivingContent.length; x++) {
                  receivingContent[x].classList.remove('display');
                }
              }
            });
          });
        }

        var informationRadio = subcontentItem.querySelectorAll('.js-information-toggle');
        var informationContent = subcontentItem.querySelectorAll('.js-information-wrapper');

        if (informationRadio.length > 0 && informationContent.length > 0) {
          informationRadio.forEach(function (item) {
            item.addEventListener('click', function () {
              var itemElement = item;

              if (itemElement.value === '利用する') {
                for (var x = 0; x < informationContent.length; x++) {
                  informationContent[x].classList.add('display');
                }
              } else {
                for (var x = 0; x < informationContent.length; x++) {
                  informationContent[x].classList.remove('display');
                }
              }
            });
          });
        }
      });
    };

    exports.default = toggleRadio;
  },{}],"js/components/twoSideMultiSelect.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Create functionality for two side multiselect
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var swapElements = function swapElements(obj1, obj2) {
      var parent2 = obj2.parentNode;
      var next2 = obj2.nextElementSibling;

      if (next2 === obj1) {
        parent2.insertBefore(obj1, obj2);
      } else {
        obj1.parentNode.insertBefore(obj2, obj1);

        if (next2) {
          parent2.insertBefore(obj1, next2);
        } else {
          parent2.appendChild(obj1);
        }
      }
    };

    var twoSideMultiSelect = function twoSideMultiSelect() {
      var source = document.querySelector('.js-multiselect-source');
      var target = document.querySelector('.js-multiselect-target');
      var right = document.querySelector('.js-multiselect-right');
      var left = document.querySelector('.js-multiselect-left');
      var rightAll = document.querySelector('.js-multiselect-right-all');
      var leftAll = document.querySelector('.js-multiselect-left-all');
      var inputHidden = document.querySelector('.js-target-value');
      var button = document.querySelector('.js-input-button');
      var draggable;

      if (right && left && source && target) {
        right.addEventListener('click', function () {
          var sourceValue = source.querySelectorAll('.multiselect');

          if (sourceValue.length > 0) {
            sourceValue.forEach(function (item) {
              var inputElement = item.querySelectorAll('input');

              if (inputElement) {
                inputElement.forEach(function (inputItem) {
                  if (inputItem.checked) {
                    item.remove();

                    if (target.classList.contains('js-target-draggable')) {
                      draggable = '<div class="draggable js-draggable"><div></div><div></div><div></div>';
                    }

                    item.classList.remove('selected');
                    target.innerHTML += "<label class=\"".concat(item.className, "\">").concat(item.innerHTML).concat(draggable, "</label>");

                    if (inputHidden) {
                      inputHidden.value = 'hasValue';

                      if (button) {
                        button.classList.add('blue');
                        button.classList.remove('disabled');
                      }
                    }
                  }
                });
              }
            });
          }
        });

        if (rightAll) {
          rightAll.addEventListener('click', function () {
            var sourceValue = source.querySelectorAll('.multiselect');

            if (sourceValue.length > 0) {
              sourceValue.forEach(function (item) {
                var inputElement = item.querySelectorAll('input');

                if (inputElement) {
                  inputElement.forEach(function (inputItem) {
                    inputItem.checked = true;
                  });
                  inputElement.forEach(function (inputItem) {
                    if (inputItem.checked) {
                      item.remove();

                      if (target.classList.contains('js-target-draggable')) {
                        draggable = '<div class="draggable js-draggable"><div></div><div></div><div></div>';
                      }

                      item.classList.remove('selected');
                      target.innerHTML += "<label class=\"".concat(item.className, "\">").concat(item.innerHTML).concat(draggable, "</label>");
                    }
                  });
                }
              });
            }
          });
        }

        left.addEventListener('click', function () {
          var targetValue = target.querySelectorAll('.multiselect');

          if (targetValue.length > 0) {
            targetValue.forEach(function (item) {
              var inputElement = item.querySelectorAll('input');

              if (inputElement) {
                inputElement.forEach(function (inputItem) {
                  if (inputItem.checked) {
                    item.remove();
                    item.classList.remove('selected');
                    source.innerHTML += "<label class=\"".concat(item.className, "\">").concat(item.innerHTML, "</label>");
                    var innerLabel = target.querySelectorAll('label');

                    if (innerLabel.length <= 0 && inputHidden) {
                      inputHidden.value = '';
                      var inputs = document.querySelectorAll('.js-check-input input[type="text"], .js-check-input input[type="email"], textarea');

                      if (inputs && button) {
                        var hasValue = Array.prototype.slice.call(inputs).some(function (x) {
                          return x.value.length;
                        });

                        if (button) {
                          if (hasValue) {
                            button.classList.add('blue');
                            button.classList.remove('disabled');
                          } else {
                            button.classList.remove('blue');
                            button.classList.add('disabled');
                          }
                        }
                      }
                    }
                  }
                });
              }
            });
          }
        });

        if (leftAll) {
          leftAll.addEventListener('click', function () {
            var targetValue = target.querySelectorAll('.multiselect');

            if (targetValue.length > 0) {
              targetValue.forEach(function (item) {
                var inputElement = item.querySelectorAll('input');

                if (inputElement) {
                  inputElement.forEach(function (inputItem) {
                    inputItem.checked = true;
                  });
                  inputElement.forEach(function (inputItem) {
                    if (inputItem.checked) {
                      item.remove();
                      item.classList.remove('selected');
                      source.innerHTML += "<label class=\"".concat(item.className, "\">").concat(item.innerHTML, "</label>");
                    }
                  });
                }
              });
            }
          });
        }
      }
    };

    exports.default = twoSideMultiSelect;
  },{}],"js/components/duplicateContent.ts":[function(require,module,exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Adds and delete candidate names
     */

    function setInputFilter(textbox, inputFilter) {
      ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;

            if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          } else {
            this.value = '';
          }
        });
      });
    }

    var getDuplicateContent = function getDuplicateContent(subcontent, content, labelString, noParenthesis, secondLabelString, hasDuplicatedName) {
      if (subcontent.length > 0) {
        subcontent.forEach(function (subcontentItem, subcontentIndex) {
          var addButton = subcontentItem.querySelector('.js-add-ss');
          var label = subcontentItem.querySelectorAll('.js-label-ss');
          var secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
          var html = content[subcontentIndex].querySelector('.js-duplicate');
          var inputClones = [];
          var deleteButton = subcontentItem.querySelectorAll('.js-delete-ss');
          var hasNumItems = subcontentItem.classList.contains('js-personal-data-count');
          var isPersonalData = subcontentItem.classList.contains('js-personal-data') || subcontentItem.classList.contains('js-personal-data-count');
          if (label) {
            label.forEach(function (item) {
              labelString = item.innerHTML;
            });
          }

          if (html) {
            html = html.innerHTML;
          }

          if (deleteButton.length > 0) {
            deleteButton.forEach(function (deleteItem) {
              deleteItem.addEventListener('click', function () {
                var deleteParent = deleteItem.closest('.js-duplicate');

                var closeBtns = [...document.getElementsByClassName("close-ct")]
                closeBtns.forEach(btn => btn.addEventListener("click", () => {
                  deleteParent = null
                }))

                if (deleteParent) {
                  if (isPersonalData) {
                    $('.btn-submit-ct').click(function () {
                      deleteParent && deleteParent.remove();
                      hideIndex();
                    })
                  } else {
                    deleteParent && deleteParent.remove();
                    hideIndex();
                  }
                  if (hasNumItems) {
                    $('.btn-submit-ct').click(function () {
                      deleteParent && deleteParent.remove();
                      // var numItems = subcontentItem.querySelectorAll('.form__select-duplicate');
                      // subcontentItem.parentNode.querySelector('.count').innerHTML = numItems.length;
                      hideIndex();
                    })
                  }
                }

                label = subcontentItem.querySelectorAll('.js-label-ss');
                secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
                label.forEach(function (labelItem, labelIndex) {
                  if (isPersonalData) {
                    if (noParenthesis) {
                      labelItem.innerHTML = labelString;
                    } else {
                      labelItem.innerHTML = labelString;
                    }
                  } else {
                    if (noParenthesis) {
                      labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                    } else {
                      labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                    }
                  }

                  if (secondLabel[labelIndex]) {
                    secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                  }
                });
                function hideIndex(){
                  var currentDelete = subcontentItem.querySelectorAll('.js-delete-ss');
                  if (currentDelete.length === 1) {
                    currentDelete.forEach(function (item) {
                      item.classList.add('hide');
                    });
                  }
                }
                if (hasDuplicatedName) {
                  var mainParent = content[subcontentIndex].querySelectorAll('.js-duplicate');
                  mainParent.forEach(function (cloneItem, cloneIndex) {
                    var inputs = cloneItem.querySelectorAll('.has-name');
                    inputs.forEach(function (inputItem, inputIndex) {
                      inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                    });
                  });
                }
              });
            });
          }

          if (addButton) {
            addButton.addEventListener('click', function () {
              const container = $(addButton).parent()[0]
              const parent1 = $(container).parent()[0]

              console.log(parent1.classList)

              let deleteItem = null
              let parent = null
              deleteButton = subcontentItem.querySelectorAll('.js-delete-ss');

              var clone = document.createElement('div');

              if (clone && content[subcontentIndex]) {
                content[subcontentIndex].appendChild(clone);

                clone.classList.add('form__select-duplicate');
                clone.classList.add('js-duplicate');
                clone.innerHTML = html;
                var deleteClone = clone.querySelector('.js-delete-ss');
                var inputNumber = clone.querySelectorAll('.js-input-number');
                var inputs = clone.querySelectorAll('input, textarea');
                var inputName = clone.querySelectorAll('.has-name');
                var question = clone.querySelectorAll('.question');

                deleteButton = subcontentItem.querySelectorAll('.js-delete-ss');
                deleteButton.forEach(function (item) {
                  item.classList.remove('hide');
                  item.addEventListener("click", () => {
                    deleteItem = item.closest(".form__subitem")
                    parent = deleteItem.closest(".js-personal-data-count")
                  })
                });

                if (parent1.classList.contains("js-personal-data-count")) {
                  const numItems1 = $(parent1).find(".form__subitem")
                  $(parent1).prev()[0].innerHTML = `<span class="count">${numItems1.length}</span>回`
                }

                if (question.length > 0) {
                  question.forEach(function (questionItem) {
                    questionItem.classList.add('hide');
                  });
                }

                if (inputNumber.length > 0) {
                  inputNumber.forEach(function (item) {
                    var itemElement = item;
                    itemElement.type = 'text';
                    setInputFilter(item, function (value) {
                      return /^[0-9]*$/.test(value);
                    });
                  });
                }

                var index = 0;
                inputs.forEach(function (inputItem) {
                  if (!(inputItem.getAttribute('type') === 'radio' || inputItem.getAttribute('type') === 'checkbox')) {
                    inputItem.value = '';
                  }

                  if (hasDuplicatedName && inputItem.name) {
                    inputClones[index] = inputItem.name;
                    inputItem.classList.add('has-name');
                    inputItem.name = '';
                    index = index + 1;
                  }
                });

                if (inputName.length > 0) {
                  inputName.forEach(function (item) {
                    item.classList.remove('has-name');
                    item.classList.add('has-subname');
                  });
                }

                if (deleteClone) {
                  deleteClone.classList.remove('hide');
                  deleteClone.addEventListener('click', function () {
                    if (clone) {
                      if (isPersonalData) {
                        $('.btn-submit-ct').click(function () {
                          deleteItem && deleteItem.remove()
                          hideIndex();
                        })
                      } else {
                        clone.remove();
                        hideIndex();
                      }
                      if (hasNumItems) {
                        $('.btn-submit-ct').click(function () {
                          deleteItem && deleteItem.remove()

                          if (parent) {
                            const numItems = $(parent).find(".form__subitem")
                            $(parent).prev()[0].innerHTML = `<span class="count">${numItems.length}</span>回`
                          }
                          hideIndex();
                        })
                      }
                    }

                    label = subcontentItem.querySelectorAll('.js-label-ss');
                    secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
                    label.forEach(function (labelItem, labelIndex) {
                      if (isPersonalData) {
                        if (noParenthesis) {
                          labelItem.innerHTML = labelString;
                        } else {
                          labelItem.innerHTML = labelString;
                        }
                      } else {
                        if (noParenthesis) {
                          labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                        } else {
                          labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                        }
                      }


                      if (secondLabel[labelIndex]) {
                        secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                      }
                    });
                    function hideIndex(){
                      var currentDelete = subcontentItem.querySelectorAll('.js-delete-ss');
                      if (currentDelete.length === 1) {
                        currentDelete.forEach(function (item) {
                          item.classList.add('hide');
                        });
                      }
                    }
                    if (hasDuplicatedName) {
                      var mainParent = content[subcontentIndex].querySelectorAll('.js-duplicate');
                      mainParent.forEach(function (cloneItem, cloneIndex) {
                        var inputs = cloneItem.querySelectorAll('.has-name');
                        inputs.forEach(function (inputItem, inputIndex) {
                          inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                        });
                      });
                    }
                  });
                }

                if (hasDuplicatedName) {
                  var mainParent = content[subcontentIndex].querySelectorAll('.js-duplicate');
                  mainParent.forEach(function (cloneItem, cloneIndex) {
                    var inputs = cloneItem.querySelectorAll('.has-name');
                    inputs.forEach(function (inputItem, inputIndex) {
                      inputItem.name = inputClones[inputIndex].replace(/(\d+)(?!.*\d)/g, String(cloneIndex + 1));
                    });
                  });
                }
              }

              label = subcontentItem.querySelectorAll('.js-label-ss');
              secondLabel = subcontentItem.querySelectorAll('.js-label-second-ss');
              label.forEach(function (labelItem, labelIndex) {
                if(isPersonalData){
                  if (noParenthesis) {
                    labelItem.innerHTML = labelString;
                  } else {
                    labelItem.innerHTML = labelString;
                  }
                }else {
                  if (noParenthesis) {
                    labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                  } else {
                    labelItem.innerHTML = labelString.replace(/(\d+)(?!.*\d)/g, String(labelIndex + 1));
                  }
                }


                if (secondLabel[labelIndex]) {
                  secondLabel[labelIndex].innerHTML = secondLabelString + '(' + (labelIndex + 1) + ')';
                }
              });
            });
          }
        });
      }
    };

    var duplicateContent = function duplicateContent() {
      var subcontent = document.querySelectorAll('.js-single-selection');
      var content = document.querySelectorAll('.js-content-ss');
      getDuplicateContent(subcontent, content, '回答選択肢 ', false, '選択肢遷移先 ');
      var subcontentMultiple = document.querySelectorAll('.js-multiple-selection');
      var contentMultiple = document.querySelectorAll('.js-content-ms');
      getDuplicateContent(subcontentMultiple, contentMultiple, '回答選択肢 ');
      var subcontentSingleFreeInput = document.querySelectorAll('.js-single-selection-free-input');
      var contentSingleFreeInput = document.querySelectorAll('.js-content-ssfi');
      getDuplicateContent(subcontentSingleFreeInput, contentSingleFreeInput, '回答選択肢 ', false, '選択肢遷移先 ');
      var subcontentMultipleFreeInput = document.querySelectorAll('.js-multiple-selection-free-input');
      var contentMultipleFreeInput = document.querySelectorAll('.js-content-msfi');
      getDuplicateContent(subcontentMultipleFreeInput, contentMultipleFreeInput, '回答選択肢 ');
      var subcontentMatrixSingleSelection = document.querySelectorAll('.js-matrix-single-selection');
      var contentMatrixSingleSelection = document.querySelectorAll('.js-content-mss');
      getDuplicateContent(subcontentMatrixSingleSelection, contentMatrixSingleSelection, '回答選択肢 ');
      var subcontentSingleSelectionChild = document.querySelectorAll('.js-single-selection-child');
      var contentSingleSelectionChild = document.querySelectorAll('.js-content-ssc');
      getDuplicateContent(subcontentSingleSelectionChild, contentSingleSelectionChild, '回答選択肢 ');
      var contact = document.querySelectorAll('.js-contact-container');
      var contactContent = document.querySelectorAll('.js-contact-content');
      getDuplicateContent(contact, contactContent, '送信確認メールアドレス ', true, '', true);
      var delivery = document.querySelectorAll('.js-delivery-container');
      var deliveryContent = document.querySelectorAll('.js-delivery-content');
      getDuplicateContent(delivery, deliveryContent, '配信設定名 ', true, '', true);
      var contact2 = document.querySelectorAll('.js-contact-container-2');
      var contactContent2 = document.querySelectorAll('.js-contact-content-2');
      getDuplicateContent(contact2, contactContent2, '送信確認メールアドレス ', true, '', true);
      var delivery2 = document.querySelectorAll('.js-delivery-container-2');
      var deliveryContent2 = document.querySelectorAll('.js-delivery-content-2');
      getDuplicateContent(delivery2, deliveryContent2, '配信設定名 ', true, '', true);
      var contact3 = document.querySelectorAll('.js-contact-container-3');
      var contactContent3 = document.querySelectorAll('.js-contact-content-3');
      getDuplicateContent(contact3, contactContent3, '送信確認メールアドレス ', true, '', true);
      var delivery3 = document.querySelectorAll('.js-delivery-container-3');
      var deliveryContent3 = document.querySelectorAll('.js-delivery-content-3');
      getDuplicateContent(delivery3, deliveryContent3, '配信設定名 ', true, '', true);
      var confirm = document.querySelectorAll('.js-confirm-container');
      var confirmContent = document.querySelectorAll('.js-confirm-content');
      getDuplicateContent(confirm, confirmContent, '送信確認携帯メールアドレス ', true, '', true);
      var personalData = document.querySelectorAll('.js-personal-data');
      var personalDataContent = document.querySelectorAll('.js-content-personal-data');
      getDuplicateContent(personalData, personalDataContent, '取扱ファンド ');
      var personalData2 = document.querySelectorAll('.js-personal-data-count');
      var personalDataContent2 = document.querySelectorAll('.js-content-personal-data-count');
      getDuplicateContent(personalData2, personalDataContent2, 'コンタクト履歴 ');
    };

    exports.default = duplicateContent;
  },{}],"js/components/editButton.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Edit Button Hover
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var editButton = function editButton() {
      var editButton = document.querySelectorAll('.js-button-hover');
      var editButtonClick = document.querySelectorAll('.js-button-click');
      var buttonWrapper = document.querySelectorAll('.js-button-wrapper');
      var tableRow = document.querySelectorAll('.js-table-row');
      var SP = window.matchMedia("(max-width: 767px)");
      var PC = window.matchMedia("(min-width: 768px)");
      var currentButton;

      if (editButton.length > 0) {
        currentButton = editButton;
      } else {
        currentButton = editButtonClick;
      }

      if (PC.matches) {
        if (currentButton && buttonWrapper) {
          var _loop = function _loop(x) {
            var buttonWrapperItem = buttonWrapper[x];
            var tableRowItem = tableRow[x];
            var editButtonItem = currentButton[x];
            var bodyRect = tableRowItem.getBoundingClientRect();
            var elemRect = currentButton[x].getBoundingClientRect();
            var offset = elemRect.top - bodyRect.top;
            buttonWrapperItem.style.bottom = offset + editButtonItem.offsetHeight + 'px';

            if (editButton.length > 0) {
              editButton[x].addEventListener('mouseover', function () {
                buttonWrapper[x].classList.add('active');
              });
              editButton[x].addEventListener('mouseout', function () {
                buttonWrapper[x].classList.remove('active');
              });
            } else {
              editButtonClick[x].addEventListener('click', function () {
                buttonWrapper.forEach(function (item) {
                  if (item.classList.contains('active')) {
                    if (buttonWrapper[x] != item) {
                      item.classList.remove('active');
                    }
                  }
                });
                buttonWrapper[x].classList.toggle('active');
              });
            }
          };

          for (var x = 0; x < currentButton.length; x++) {
            _loop(x);
          }
        }
      } else if (SP.matches) {
        if (currentButton && buttonWrapper) {
          var _loop2 = function _loop2(_x) {
            var buttonWrapperItem = buttonWrapper[_x];
            var tableRowItem = tableRow[_x];
            var editButtonItem = currentButton[_x];

            if (editButton[_x]) {
              editButton[_x].addEventListener('click', function () {
                var tableRowElement = tableRow[_x];

                buttonWrapper[_x].classList.toggle('active');

                if (buttonWrapper[_x].classList.contains('active')) {
                  tableRowElement.style.paddingTop = buttonWrapperItem.offsetHeight + 'px';
                } else if (buttonWrapper[_x].classList.contains('no-sp-padding')) {
                  tableRowElement.style.paddingTop = '0';
                } else {
                  tableRowElement.style.paddingTop = '10px';
                }

                var bodyRect = tableRowItem.getBoundingClientRect();

                var elemRect = editButton[_x].getBoundingClientRect();

                var offset = elemRect.top - bodyRect.top - buttonWrapperItem.offsetHeight;
                buttonWrapperItem.style.bottom = offset + (editButtonItem.offsetHeight + 15) + 'px';
              });
            } else {
              editButtonClick[_x].addEventListener('click', function () {
                buttonWrapper.forEach(function (item) {
                  if (item.classList.contains('active')) {
                    if (buttonWrapper[_x] != item) {
                      var tableRowElementInner = item.closest('.js-table-row');
                      item.classList.remove('active');

                      if (buttonWrapper[_x].classList.contains('active')) {
                        tableRowElementInner.style.paddingTop = buttonWrapperItem.offsetHeight + 'px';
                      } else if (buttonWrapper[_x].classList.contains('no-sp-padding')) {
                        tableRowElementInner.style.paddingTop = '0';
                      } else {
                        tableRowElementInner.style.paddingTop = '10px';
                      }
                    }
                  }
                });
                var tableRowElement = tableRow[_x];

                buttonWrapper[_x].classList.toggle('active');

                if (buttonWrapper[_x].classList.contains('active')) {
                  tableRowElement.style.paddingTop = buttonWrapperItem.offsetHeight + 'px';
                } else if (buttonWrapper[_x].classList.contains('no-sp-padding')) {
                  tableRowElement.style.paddingTop = '0';
                } else {
                  tableRowElement.style.paddingTop = '10px';
                }

                var bodyRect = tableRowItem.getBoundingClientRect();

                var elemRect = editButtonClick[_x].getBoundingClientRect();

                var offset = elemRect.top - bodyRect.top - buttonWrapperItem.offsetHeight;
                buttonWrapperItem.style.bottom = offset + (editButtonItem.offsetHeight + 15) + 'px';
              });
            }
          };

          for (var _x = 0; _x < currentButton.length; _x++) {
            _loop2(_x);
          }
        }
      }

      window.addEventListener('click', function (event) {
        var clickedElement = event.target;

        if (!clickedElement.closest('.js-button-click')) {
          buttonWrapper.forEach(function (item, index) {
            var buttonWrapperItem = item;
            item.classList.remove('active');
            var tableRowElement = tableRow[index];

            if (item.classList.contains('active')) {
              tableRowElement.style.paddingTop = buttonWrapperItem.offsetHeight + 'px';
            } else if (item.classList.contains('no-sp-padding')) {
              tableRowElement.style.paddingTop = '0';
            } else {
              tableRowElement.style.paddingTop = '10px';
            }
          });
        }
      });
      var resetBtn = document.querySelector('.js-reset');
      var resetWrap = document.querySelector('.js-select-wrap');
      var resetOption = document.querySelector('.js-select-option');
      resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', function () {
        resetWrap === null || resetWrap === void 0 ? void 0 : resetWrap.classList.add('select--gray');
        resetWrap === null || resetWrap === void 0 ? void 0 : resetWrap.addEventListener('click', function () {
          resetWrap === null || resetWrap === void 0 ? void 0 : resetWrap.classList.remove('select--gray');
        });
      });
      var textGray = document.querySelectorAll('.js-gray');

      var _loop3 = function _loop3(_x2) {
        textGray[_x2].addEventListener('click', function () {
          textGray[_x2].classList.add('dark-gray');
        });
      };

      for (var _x2 = 0; _x2 < textGray.length; _x2++) {
        _loop3(_x2);
      }
    };

    exports.default = editButton;
  },{}],"js/components/toggleSelect.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Change the color of select if an option is chosen
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleSelect = function toggleSelect() {
      var select = document.querySelectorAll('select');

      if (select.length > 0) {
        select.forEach(function (item) {
          var options = item.querySelectorAll('option:disabled');
          var isDisabled = false;
          options.forEach(function (optionItem) {
            var optionElement = optionItem;

            if (optionElement.value === item.value) {
              isDisabled = true;
            }
          });

          if (item.selectedIndex <= 0 && (item.value === '選択してください' || isDisabled)) {
            item.classList.add('gray');
          }

          item.addEventListener('change', function () {
            if (item.selectedIndex === 0 && item.value === '') {
              item.classList.add('gray');
            } else {
              item.classList.remove('gray');
            }
          });
        });
      }
    };

    exports.default = toggleSelect;
  },{}],"js/components/changePosition.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Change the position of table on select change
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var changePosition = function changePosition() {
      var select = document.querySelectorAll('.js-change-position');
      var itemTr = document.querySelectorAll('.js-tr');
      var tableNumber = document.querySelectorAll('.js-table-number');
      var tbody = document.querySelector('.js-tbody');

      if (select.length > 0 && itemTr && tableNumber && tbody) {
        var options = {
          valueNames: [{
            name: 'js-table-number',
            attr: 'data-id'
          }]
        }; //@ts-ignore

        var tableList = new List('js-sort-table', options);
        select.forEach(function (item) {
          item.addEventListener('change', function () {
            itemTr = document.querySelectorAll('.js-tr');
            var itemElement = item;
            var itemParent = itemElement.closest('.js-tr');
            var swapElement = itemTr[Number(itemElement.value) - 1];

            if (itemParent && swapElement) {
              var selectedNumber = itemParent.querySelector('.js-table-number');

              if (selectedNumber) {
                if (Number(selectedNumber.innerHTML) < Number(itemElement.value)) {
                  selectedNumber.setAttribute('data-id', itemElement.value + 'c');
                } else {
                  selectedNumber.setAttribute('data-id', itemElement.value + 'a');
                }
              }

              tableList.reIndex();
              tableList.sort('js-table-number', {
                order: 'asc'
              });
              tableNumber = document.querySelectorAll('.js-table-number');
              tableNumber.forEach(function (tableItem, index) {
                var _a;

                tableItem.innerHTML = String(index + 1);
                tableItem.setAttribute('data-id', String(index + 1) + 'b');
                var selectedIndexMain = (_a = tableItem.closest('.js-tr')) === null || _a === void 0 ? void 0 : _a.querySelector('select');
                selectedIndexMain.selectedIndex = index;
              });
            }
          });
        });
      }
    };

    exports.default = changePosition;
  },{}],"js/components/graphButton.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Graph Button Hover
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var graphButton = function graphButton() {
      var graphButton = document.querySelector('.js-graph-hover');
      var graphWrapper = document.querySelector('.js-graph-wrapper');
      var SP = window.matchMedia("(max-width: 767px)");
      var PC = window.matchMedia("(min-width: 768px)");

      if (PC.matches) {
        if (graphButton && graphWrapper) {
          graphButton === null || graphButton === void 0 ? void 0 : graphButton.addEventListener('mouseover', function () {
            graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.classList.add('show');
            graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.addEventListener('mouseover', function () {
              graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.classList.add('show');
            });
            graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.addEventListener('mouseout', function () {
              graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.classList.remove('show');
            });
          });
          graphButton === null || graphButton === void 0 ? void 0 : graphButton.addEventListener('mouseout', function () {
            graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.classList.remove('show');
          });
        }
      } else if (SP.matches) {
        if (graphButton && graphWrapper) {
          graphButton === null || graphButton === void 0 ? void 0 : graphButton.addEventListener('click', function () {
            graphWrapper === null || graphWrapper === void 0 ? void 0 : graphWrapper.classList.toggle('show');
          });
        }
      }
    };

    exports.default = graphButton;
  },{}],"js/components/scrollArrow.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Add scroll arrow to overflow
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var scrollArrow = function scrollArrow() {
      var scrollContainer = document.querySelectorAll('.js-scroll-wrapper');

      if (scrollContainer) {
        scrollContainer.forEach(function (item) {
          var parentElement = item.parentElement;

          if (parentElement) {
            var leftArrowItem = parentElement.querySelector('.js-arrow-left');
            var rightArrowItem = parentElement.querySelector('.js-arrow-right');
            var topArrowItem = parentElement.querySelector('.js-arrow-top');
            var bottomArrowItem = parentElement.querySelector('.js-arrow-bottom');

            if (leftArrowItem && rightArrowItem) {
              if (item.scrollWidth <= item.clientWidth) {
                leftArrowItem.style.display = 'none';
                rightArrowItem.style.display = 'none';
              }

              leftArrowItem.addEventListener('click', function () {
                item.scrollLeft -= 50;
              });
              rightArrowItem.addEventListener('click', function () {
                item.scrollLeft += 50;
              });
            }

            if (topArrowItem && bottomArrowItem) {
              if (item.scrollHeight <= item.clientHeight) {
                topArrowItem.style.display = 'none';
                bottomArrowItem.style.display = 'none';
              }

              topArrowItem.addEventListener('click', function () {
                item.scrollTop -= 50;
              });
              bottomArrowItem.addEventListener('click', function () {
                item.scrollTop += 50;
              });
            }
          }
        });
      }
    };

    exports.default = scrollArrow;
  },{}],"js/components/pagination.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Add pagination functionality
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var pagination = function pagination() {
      var pagination = document.querySelectorAll('.pagination__input');
      var previous = document.querySelectorAll('.pagination__nextprev--previous');
      var next = document.querySelectorAll('.pagination__nextprev:last-child');

      if (pagination.length > 0) {
        pagination.forEach(function (item) {
          item.addEventListener('input', function () {
            var itemElement = item;
            pagination.forEach(function (subitem, index) {
              var subitemElement = subitem;
              subitemElement.value = itemElement.value;

              if (Number(itemElement.value) > 1) {
                previous[index].classList.remove('disabled');
              } else {
                previous[index].classList.add('disabled');
              }

              if (Number(itemElement.value) >= 999) {
                next[index].classList.add('disabled');
              } else {
                next[index].classList.remove('disabled');
              }
            });
          });
        });
      }
    };

    exports.default = pagination;
  },{}],"js/components/toggleShowHide.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles display of element
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleShowHide = function toggleShowHide() {
      var toggle = document.querySelectorAll('.js-toggle-hide');
      var show = document.querySelectorAll('.js-toggle-show');

      if (toggle.length > 0) {
        toggle.forEach(function (item) {
          item.addEventListener('click', function () {
            var nextElement = item.nextElementSibling;

            if (show.length > 0) {
              var parentElement = item.parentElement;

              if (parentElement) {
                nextElement = parentElement.nextElementSibling;
              }
            }

            if (nextElement) {
              nextElement.classList.toggle('hide');
            }

            item.classList.toggle('toggle');
          });
        });
      }
    };

    exports.default = toggleShowHide;
  },{}],"js/components/toggleSelectOnRadio.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the select on radio active
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleSelectOnRadio = function toggleSelectOnRadio() {
      var radio = document.querySelectorAll('.js-classification-radio');
      var select = document.querySelectorAll('.js-classification-select');

      if (radio) {
        radio.forEach(function (item) {
          item.addEventListener('click', function () {
            var content = item.nextElementSibling;
            select.forEach(function (selectItem) {
              selectItem.classList.add('disabled');
            });

            if (content) {
              content.classList.remove('disabled');
            }
          });
        });
      }
    };

    exports.default = toggleSelectOnRadio;
  },{}],"js/components/toggleOnClickShift.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the on click functionlity on SHIFT keypress
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleOnClickShift = function toggleOnClickShift() {
      var label = document.querySelectorAll('.js-shift-key label');

      if (window.matchMedia("(pointer: coarse)").matches) {
        if (label) {
          label.forEach(function (item) {
            item.classList.remove('disabled');
          });
        }
      }

      document.addEventListener('keydown', function (event) {
        label = document.querySelectorAll('.js-shift-key label');

        if (event.key === 'Shift') {
          if (label) {
            label.forEach(function (item) {
              item.classList.remove('disabled');
            });
          }
        }
      });
      document.addEventListener('keyup', function (event) {
        label = document.querySelectorAll('.js-shift-key label');

        if (label) {
          label.forEach(function (item) {
            item.classList.add('disabled');
          });
        }
      });
    };

    exports.default = toggleOnClickShift;
  },{}],"js/components/togglePopup.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the element on click
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var togglePopup = function togglePopup() {
      var button = document.querySelectorAll('.js-popup-display');
      var hiddenElementAll = document.querySelectorAll('.js-hidden-element');

      if (button) {
        button.forEach(function (item) {
          item.addEventListener('click', function () {
            var hiddenElement = item.querySelector('.js-hidden-element');
            var hiddenPreviousElement = document.querySelector('.show');

            if (hiddenPreviousElement && hiddenElement !== hiddenPreviousElement) {
              hiddenPreviousElement.classList.toggle('hide');
              hiddenPreviousElement.classList.toggle('show');
            }

            if (hiddenElement) {
              hiddenElement.classList.toggle('hide');
              hiddenElement.classList.toggle('show');
            }
          });
        });
        document.body.addEventListener('click', function (event) {
          var eventElement = event.target;

          if (!(eventElement.classList.contains('js-disable-click') || eventElement.classList.contains('js-hidden-element'))) {
            hiddenElementAll.forEach(function (item) {
              item.classList.add('hide');
              item.classList.remove('show');
            });
          }

          if (eventElement.classList.contains('js-disable-click') || eventElement.classList.contains('js-hidden-element')) {
            eventElement.classList.add('read');
          }
        });
      }

      var popupButton = document.querySelectorAll('.js-popup-btn');
      var popupContent = document.querySelectorAll('.js-popup-content');
      var table = document.querySelector('.table__scroll');
      var PC = window.matchMedia("(min-width: 768px)");

      var _loop = function _loop(i) {
        var nearestPopup = popupButton[i].nextElementSibling;

        if (nearestPopup === null || nearestPopup === void 0 ? void 0 : nearestPopup.classList.contains('js-popup-hover')) {
          if (PC.matches) {
            popupButton[i].addEventListener('mouseover', function () {
              if (nearestPopup) {
                nearestPopup.classList.add('popup--show');
              }
            });
            popupButton[i].addEventListener('mouseout', function () {
              if (nearestPopup) {
                nearestPopup.classList.remove('popup--show');
              }
            });
          } else {
            popupButton[i].addEventListener('click', function () {
              popupContent.forEach(function (item) {
                if (item.classList.contains('popup--show')) {
                  if (popupContent[i] != item) {
                    item.classList.remove('popup--show');
                  }
                }
              });
              popupContent[i].classList.toggle('popup--show');
              var isPopupShow = document.querySelectorAll('popup--show');

              if (isPopupShow.length > 0) {
                table === null || table === void 0 ? void 0 : table.classList.remove('no-overflow');
              } else {
                table === null || table === void 0 ? void 0 : table.classList.add('no-overflow');
              }
            });
          }
        } else {
          popupButton[i].addEventListener('click', function () {
            popupContent.forEach(function (item) {
              if (item.classList.contains('popup--show')) {
                if (popupContent[i] != item) {
                  item.classList.remove('popup--show');
                }
              }
            });
            popupContent[i].classList.toggle('popup--show');
            var isPopupShow = document.querySelectorAll('popup--show');

            if (isPopupShow.length > 0) {
              table === null || table === void 0 ? void 0 : table.classList.remove('no-overflow');
            } else {
              table === null || table === void 0 ? void 0 : table.classList.add('no-overflow');
            }
          });
        }
      };

      for (var i = 0; popupButton.length > i; i++) {
        _loop(i);
      }

      window.addEventListener('click', function (event) {
        var clickedElement = event.target;

        if (!clickedElement.closest('.js-popup-btn')) {
          popupContent.forEach(function (item) {
            item.classList.remove('popup--show');
          });
        }
      });
    };

    exports.default = togglePopup;
  },{}],"js/components/enableButtonOnChekced.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Enables button when checkbox is checked
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var enableButtonOnChecked = function enableButtonOnChecked() {
      var checkbox = document.querySelectorAll('.js-enable-button input');
      var button = document.querySelector('.js-enable-checkbox');

      if (button) {
        if (checkbox) {
          checkbox.forEach(function (item) {
            item.addEventListener('click', function () {
              checkbox = document.querySelectorAll('.js-enable-button input');
              var isChecked = Array.prototype.slice.call(checkbox).some(function (x) {
                return x.checked;
              });

              if (isChecked) {
                button.classList.remove('disabled');
                button.classList.add('blue');
              } else {
                button.classList.add('disabled');
                button.classList.remove('blue');
              }

              var parentElement = item.closest('li');
              var inputItem = item;

              if (inputItem.checked) {
                if (parentElement) {
                  //@ts-ignore
                  Sortable.utils.select(parentElement);
                }
              } else {
                if (parentElement) {
                  //@ts-ignore
                  Sortable.utils.deselect(parentElement);
                }
              }
            });
          });
        }
      }
    };

    exports.default = enableButtonOnChecked;
  },{}],"js/components/toggleFolder.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggles the folder
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleFolder = function toggleFolder() {
      var folder = document.querySelectorAll('.js-toggle-folder');
      var fileContainer = document.querySelectorAll('.js-toggle-files');

      if (folder && fileContainer) {
        folder.forEach(function (item, index) {
          item.addEventListener('click', function () {
            item.classList.toggle('active');
            fileContainer[index].classList.toggle('active');
          });
        });
      }
    };

    exports.default = toggleFolder;
  },{}],"js/components/enableUncheckingRadioButton.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Enables unchecking of radio button
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var enableUncheckingRadioButton = function enableUncheckingRadioButton() {
      var radio = document.querySelectorAll('.js-enable-uncheck input');
      var previousState = false;
      var previousElement;

      if (radio) {
        radio.forEach(function (item) {
          item.addEventListener('click', function () {
            var element = item;

            if (previousElement === element && previousState) {
              element.checked = false;
            }

            previousElement = element;
            previousState = element.checked;
          });
        });
      }
    };

    exports.default = enableUncheckingRadioButton;
  },{}],"js/components/activateCheckboxOnSelect.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Activate all checkbox on change
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var activateCheckboxOnSelect = function activateCheckboxOnSelect() {
      var select = document.querySelector('.js-checkbox-all');
      var checkbox = document.querySelectorAll('.js-checkbox-activate input');
      var button = document.querySelector('.js-enable-checkbox');

      if (select) {
        select.addEventListener('change', function () {
          var element = select;
          checkbox.forEach(function (item) {
            var itemElement = item;

            if (element.value === '全て選択' || element.value === '全て') {
              itemElement.checked = true;
            } else {
              itemElement.checked = false;
            }
          });

          if (button) {
            checkbox = document.querySelectorAll('.js-checkbox-activate input');
            var isChecked = Array.prototype.slice.call(checkbox).some(function (x) {
              return x.checked;
            });

            if (isChecked) {
              button.classList.remove('disabled');
              button.classList.add('blue');
            } else {
              button.classList.add('disabled');
              button.classList.remove('blue');
            }
          }
        });

        if (checkbox) {
          checkbox.forEach(function (item) {
            item.addEventListener('click', function () {
              var selectElement = select;
              selectElement.selectedIndex = 0;
              select.classList.add('gray');
            });
          });
        }
      }
    };

    exports.default = activateCheckboxOnSelect;
  },{}],"js/components/getCurrentDate.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Get the current date
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var getCurrentDate = function getCurrentDate() {
      var button = document.querySelector('.js-get-current-date');
      var dateInput = document.querySelector('.js-date');
      var hour = document.querySelector('.js-hour');
      var minute = document.querySelector('.js-minute');
      var select = document.querySelectorAll('.js-change-blue');
      var buttonInput = document.querySelector('.js-input-button');

      if (button && dateInput && hour && minute) {
        button.addEventListener('click', function () {
          var date = new Date();
          var currentHour = Number(date.getHours());
          var currentHourString;
          var currentMinute = Number(date.getMinutes());
          var currentMinuteString;

          if (currentHour < 9) {
            currentHourString = '09';
          } else {
            currentHourString = String(date.getHours());
          }

          if (currentMinute < 10) {
            currentMinuteString = '00';
          } else if (currentMinute < 20) {
            currentMinuteString = '10';
          } else if (currentMinute < 30) {
            currentMinuteString = '20';
          } else if (currentMinute < 40) {
            currentMinuteString = '30';
          } else if (currentMinute < 50) {
            currentMinuteString = '40';
          } else if (currentMinute < 60) {
            currentMinuteString = '50';
          } else {
            currentMinuteString = '59';
          }

          dateInput.value = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
          hour.value = currentHourString;
          minute.value = currentMinuteString;

          if (select) {
            select.forEach(function (item) {
              item.classList.remove('light-blue');
            });
          }

          if (buttonInput) {
            buttonInput.classList.remove('disabled');
            buttonInput.classList.add('blue');
          }
        });
      }
    };

    exports.default = getCurrentDate;
  },{}],"js/components/changeSelectDefault.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Changes light blue color on change
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var changeSelectDefault = function changeSelectDefault() {
      var select = document.querySelectorAll('.js-change-blue');

      if (select) {
        select.forEach(function (item) {
          item.addEventListener('change', function () {
            item.classList.remove('light-blue');
          });
        });
      }
    };

    exports.default = changeSelectDefault;
  },{}],"js/components/enableButtonOnInput.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Enables button when any input has been entered
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var enableButtonOnInput = function enableButtonOnInput() {
      var inputs = document.querySelectorAll('.js-check-input input[type="text"], .js-check-input input[type="email"], textarea, input[type="hidden"]');
      var button = document.querySelector('.js-input-button');
      var hasValue;

      if (inputs && button) {
        inputs.forEach(function (item) {
          item.addEventListener('input', function () {
            hasValue = Array.prototype.slice.call(inputs).some(function (x) {
              return x.value.length;
            });

            if (button) {
              if (hasValue) {
                button.classList.add('blue');
                button.classList.remove('disabled');
              } else {
                button.classList.remove('blue');
                button.classList.add('disabled');
              }
            }
          });
        });
      }
    };

    exports.default = enableButtonOnInput;
  },{}],"js/components/sortable.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Intializes SortableJS
     */

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleCheckbox_1 = __importDefault(require("./toggleCheckbox"));

    var sortable = function sortable() {
      var nestedSortables = [].slice.call(document.querySelectorAll('.js-target-draggable'));
      var draggedDepth = 0;
      var beforeElement;

      if (nestedSortables.length > 0 || nestedSortables) {
        for (var i = 0; i < nestedSortables.length; i++) {
          //@ts-ignore
          new Sortable(nestedSortables[i], {
            forceFallback: true,
            multiDrag: true,
            selectedClass: 'selected',
            fallbackTolerance: 3,
            fallbackClass: 'ui-sortable-helper',
            ghostClass: 'ui-ghost',
            avoidImplicitDeselect: true,
            handle: '.js-draggable',
            group: {
              name: 'nested',
              pull: function pull(to, from) {
                //@ts-ignore
                var toLvl = $(to.el).parents('.js-target-draggable').length;

                if (toLvl > 1) {
                  return false;
                }

                if (draggedDepth > 0) {
                  return false;
                }

                return true;
              }
            },
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.7,
            onStart: function onStart() {
              //@ts-ignore
              Sortable.ghost.style.opacity = 1;
            },
            emptyInsertThreshold: 8,
            onMove: function onMove(evt, originalEvent) {
              //@ts-ignore
              draggedDepth = $(evt.dragged).find('.js-target-draggable > *').length;
              var parentElement = evt.to;

              if (parentElement.classList.contains('list__subcontent')) {
                beforeElement = parentElement.closest('.list__block');
                parentElement.closest('.list__block').classList.add('ui-folder-container');
              } else if (beforeElement) {
                beforeElement.classList.remove('ui-folder-container');
              }
            },
            onSelect: function onSelect(event) {
              var checkbox = event.item.querySelector('.js-checkbox-activate input');
              setTimeout(function () {
                if (!checkbox.checked) {
                  //@ts-ignore
                  Sortable.utils.deselect(event.item);
                }
              }, 1);
            },
            onEnd: function onEnd(event) {
              toggleCheckbox_1.default();
              var folder = event.item.closest('.list__block');

              if (folder) {
                folder.classList.remove('ui-folder-container');
              }
            }
          });
        }
      }
    };

    exports.default = sortable;
  },{"./toggleCheckbox":"js/components/toggleCheckbox.ts"}],"js/components/toggleTextOnChecked.ts":[function(require,module,exports) {
    "use strict";
    /**
     * Toggle display of text when checkbox is checked
     */

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var toggleTextOnChecked = function toggleTextOnChecked() {
      var checkbox = document.querySelectorAll('.js-display-checkbox input');
      var text = document.querySelector('.js-display-text');

      if (text) {
        if (checkbox) {
          checkbox.forEach(function (item) {
            item.addEventListener('click', function () {
              checkbox = document.querySelectorAll('.js-display-checkbox input');
              var isChecked = Array.prototype.slice.call(checkbox).some(function (x) {
                return x.checked;
              });

              if (isChecked) {
                text.classList.add('hidden');
              } else {
                text.classList.remove('hidden');
              }
            });
          });
        }
      }
    };

    exports.default = toggleTextOnChecked;
  },{}],"js/index.ts":[function(require,module,exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var forEachPolyfill_1 = __importDefault(require("./components/forEachPolyfill"));

    var initializeChart_1 = __importDefault(require("./components/initializeChart"));

    var toggleJsSort_1 = __importDefault(require("./components/toggleJsSort"));

    var toggleLabel_1 = __importDefault(require("./components/toggleLabel"));

    var toggleTab_1 = __importDefault(require("./components/toggleTab"));

    var header_1 = __importDefault(require("./components/header"));

    var viewportFixOnMobile_1 = __importDefault(require("./components/viewportFixOnMobile"));

    var toggleCheckbox_1 = __importDefault(require("./components/toggleCheckbox"));

    var limitInputModalTextarea_1 = __importDefault(require("./components/limitInputModalTextarea"));

    var resizeTextarea_1 = __importDefault(require("./components/resizeTextarea"));

    var flexibleContent_1 = __importDefault(require("./components/flexibleContent"));

    var toggleCandidateRadio_1 = __importDefault(require("./components/toggleCandidateRadio"));

    var addCandidate_1 = __importDefault(require("./components/addCandidate"));

    var toggleRadio_1 = __importDefault(require("./components/toggleRadio"));

    var twoSideMultiSelect_1 = __importDefault(require("./components/twoSideMultiSelect"));

    var duplicateContent_1 = __importDefault(require("./components/duplicateContent"));

    var editButton_1 = __importDefault(require("./components/editButton"));

    var toggleSelect_1 = __importDefault(require("./components/toggleSelect"));

    var changePosition_1 = __importDefault(require("./components/changePosition"));

    var graphButton_1 = __importDefault(require("./components/graphButton"));

    var scrollArrow_1 = __importDefault(require("./components/scrollArrow"));

    var pagination_1 = __importDefault(require("./components/pagination"));

    var toggleShowHide_1 = __importDefault(require("./components/toggleShowHide"));

    var toggleSelectOnRadio_1 = __importDefault(require("./components/toggleSelectOnRadio"));

    var toggleOnClickShift_1 = __importDefault(require("./components/toggleOnClickShift"));

    var togglePopup_1 = __importDefault(require("./components/togglePopup"));

    var enableButtonOnChekced_1 = __importDefault(require("./components/enableButtonOnChekced"));

    var toggleFolder_1 = __importDefault(require("./components/toggleFolder"));

    var enableUncheckingRadioButton_1 = __importDefault(require("./components/enableUncheckingRadioButton"));

    var activateCheckboxOnSelect_1 = __importDefault(require("./components/activateCheckboxOnSelect"));

    var getCurrentDate_1 = __importDefault(require("./components/getCurrentDate"));

    var changeSelectDefault_1 = __importDefault(require("./components/changeSelectDefault"));

    var enableButtonOnInput_1 = __importDefault(require("./components/enableButtonOnInput"));

    var sortable_1 = __importDefault(require("./components/sortable"));

    var toggleTextOnChecked_1 = __importDefault(require("./components/toggleTextOnChecked"));

    document.addEventListener('DOMContentLoaded', function () {
      forEachPolyfill_1.default();
      initializeChart_1.default();
      toggleTab_1.default();
      toggleJsSort_1.default();
      toggleLabel_1.default();
      header_1.default();
      viewportFixOnMobile_1.default();
      toggleCheckbox_1.default();
      limitInputModalTextarea_1.default();
      resizeTextarea_1.default();
      flexibleContent_1.default();
      toggleCandidateRadio_1.default();
      addCandidate_1.default();
      toggleRadio_1.default();
      twoSideMultiSelect_1.default();
      duplicateContent_1.default();
      editButton_1.default();
      toggleSelect_1.default();
      changePosition_1.default();
      graphButton_1.default();
      scrollArrow_1.default();
      pagination_1.default();
      toggleShowHide_1.default();
      toggleSelectOnRadio_1.default();
      toggleOnClickShift_1.default();
      togglePopup_1.default();
      enableUncheckingRadioButton_1.default();
      enableButtonOnChekced_1.default();
      sortable_1.default();
      toggleFolder_1.default();
      activateCheckboxOnSelect_1.default();
      getCurrentDate_1.default();
      changeSelectDefault_1.default();
      enableButtonOnInput_1.default();
      toggleTextOnChecked_1.default();
    }, false);
  },{"./components/forEachPolyfill":"js/components/forEachPolyfill.ts","./components/initializeChart":"js/components/initializeChart.ts","./components/toggleJsSort":"js/components/toggleJsSort.ts","./components/toggleLabel":"js/components/toggleLabel.ts","./components/toggleTab":"js/components/toggleTab.ts","./components/header":"js/components/header.ts","./components/viewportFixOnMobile":"js/components/viewportFixOnMobile.ts","./components/toggleCheckbox":"js/components/toggleCheckbox.ts","./components/limitInputModalTextarea":"js/components/limitInputModalTextarea.ts","./components/resizeTextarea":"js/components/resizeTextarea.ts","./components/flexibleContent":"js/components/flexibleContent.ts","./components/toggleCandidateRadio":"js/components/toggleCandidateRadio.ts","./components/addCandidate":"js/components/addCandidate.ts","./components/toggleRadio":"js/components/toggleRadio.ts","./components/twoSideMultiSelect":"js/components/twoSideMultiSelect.ts","./components/duplicateContent":"js/components/duplicateContent.ts","./components/editButton":"js/components/editButton.ts","./components/toggleSelect":"js/components/toggleSelect.ts","./components/changePosition":"js/components/changePosition.ts","./components/graphButton":"js/components/graphButton.ts","./components/scrollArrow":"js/components/scrollArrow.ts","./components/pagination":"js/components/pagination.ts","./components/toggleShowHide":"js/components/toggleShowHide.ts","./components/toggleSelectOnRadio":"js/components/toggleSelectOnRadio.ts","./components/toggleOnClickShift":"js/components/toggleOnClickShift.ts","./components/togglePopup":"js/components/togglePopup.ts","./components/enableButtonOnChekced":"js/components/enableButtonOnChekced.ts","./components/toggleFolder":"js/components/toggleFolder.ts","./components/enableUncheckingRadioButton":"js/components/enableUncheckingRadioButton.ts","./components/activateCheckboxOnSelect":"js/components/activateCheckboxOnSelect.ts","./components/getCurrentDate":"js/components/getCurrentDate.ts","./components/changeSelectDefault":"js/components/changeSelectDefault.ts","./components/enableButtonOnInput":"js/components/enableButtonOnInput.ts","./components/sortable":"js/components/sortable.ts","./components/toggleTextOnChecked":"js/components/toggleTextOnChecked.ts"}]},{},["js/index.ts"], null)
//# sourceMappingURL=/js/index.js.map
