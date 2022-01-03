const Highchart = (function () {
    let modules = {};

    modules.render3dPieChart = function (container, colors, series, alpha = 75, height = 250) {
        return Highcharts.chart(container, {
            chart: {
                type: 'pie',
                height: height,
                options3d: {
                    enabled: true,
                    alpha: alpha,
                    beta: 0
                },
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            colors: colors,
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<br>' + this.key + '</b>: ' + Highcharts.numberFormat(this.point.percentage, 1) + '%'
                }
            },
            plotOptions: {
                pie: {
                    size:'100%',
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                    allowPointSelect: false,
                    cursor: 'context-menu',
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.point.name + '<br>' + Highcharts.numberFormat(this.point.percentage, 1) + '%';
                        },
                        color: '#3c3b3b',
                        connectorWidth: 0.7,
                        connectorColor: '#3c3b3b',
                    }
                }
            },
            series: [{
                type: 'pie',
                data: series
            }]
        });
    }

    modules.renderLineChart = function (container, colors, dataXAxis, dataYAxis, unit, step = 5,
                                        shareTooltip = true, titleXAxis = '', titleYAxis = '') {
        return Highcharts.chart(container, {
            chart: {
                type: 'line',
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            yAxis: {
                top: '5%',
                height: '95%',
                offset: 0,
                title: {
                    text: titleYAxis,
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: -10,
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                },
                labels: {
                    format: '{value:.1f}'
                },
            },
            xAxis: {
                title: {
                    text: titleXAxis,
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                },
                labels: {
                    step: step
                },
                categories: dataXAxis
            },
            tooltip: {
                shared: shareTooltip,
                formatter: function () {
                    if (shareTooltip) {
                        return this.points.reduce(function (s, point) {
                            return s + '</br><span style="color: ' + point.color + '">■ </span>' + point.series.name + ': ' +
                              point.y + unit;
                        }, '<b>' + this.x + '</b>');
                    } else {
                        return this.key + '<br>' + Highcharts.numberFormat(this.point.y, 0, '.', ',') + unit
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                backgroundColor: '#FCFFC5',
                borderColor: '#C98657',
                borderWidth: 1
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false,
                    },
                },
                line: {
                    marker: {
                        enabled: false,
                        symbol: 'square',
                    }
                }
            },
            series: dataYAxis,
            colors: colors,
        });
    }

    modules.renderCustomLineChart = function (container, colors, dataXAxis, dataYAxis, stepYAxis, unit, titleYAxis = '',
                                              plotLine = '', rotate = null) {
        Highcharts.chart(container, {
            chart: {
                type: 'line',
                height: 500,
                plotBorderColor: '#dedede',
                plotBorderWidth: 2
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            yAxis: {
                title: {
                    text: titleYAxis,
                    style: {
                        fontWeight: '700',
                        color: '#050104',
                    }
                },
                tickInterval: stepYAxis,
                plotLines: plotLine,
            },
            xAxis: {
                title: {
                    text: '',
                },
                tickmarkPlacement: 'on',
                gridLineColor: '#e6e6e6',
                gridLineWidth: 1,
                categories: dataXAxis,
                labels: {
                    rotation: rotate,
                },
            },
            tooltip: {
                shared: true,
                formatter: function () {
                    return this.points.reduce(function (s, point) {
                        return s + '</br><span style="color: ' + point.color + '">■ </span>' + point.series.name + ': ' +
                          point.y + unit;
                    }, '<b>' + this.x + '</b>');
                },

            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                x: 30,
                y: 0,
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false,
                floating: false,
                reversed: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1,
                labelFormatter: function () {
                    return '<span style="color:' + this.color + '">' + this.name + '</span>';
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false,
                        symbol: 'square',
                    }
                }
            },
            series: dataYAxis,
            colors: colors,
        });
    }

    modules.renderBarChart = function (container, colors, dataXAxis, dataYAxis, redLineValue, unit) {
        Highcharts.chart(container, {
            chart: {
                type: 'bar',
                plotBorderColor: '#808080',
                plotBorderWidth: 2
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataXAxis,
                title: {
                    text: null
                },
                labels: {
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify',
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                },
                plotLines: [{
                    color: 'red',
                    value: redLineValue,
                    width: '1',
                    zIndex: 4
                }]
            },
            tooltip: {
                valueSuffix: unit,
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
               enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            colors: colors,
            series: dataYAxis
        });
    }

    modules.renderScatterChart = function (container, data, colors, text_xAxis, text_yAxis) {
        Highcharts.chart(container, {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                styledMode: false,
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: text_xAxis
                },
                gridLineWidth: 1,
                tickInterval: 300,
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: text_yAxis
                },
                gridLineWidth: 1,
                tickInterval: 10,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false,
                title: {
                    text: '<span style="font-size: 15px;font-weight: 200">【その他金融セクター８銘柄】</span>',
                },
                verticalAlign: 'top',
                floating: false,
                reversed: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 0,
                labelFormatter: function () {
                    return '<span style="color:' + this.color + '">' + this.name + '</span>';
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '<span style="color:' + this.color + '">' + this.series.name + '</span>';
                        },
                        allowOverlap: false,
                        align: 'center',
                    }
                },
                scatter: {
                    marker: {
                        radius: 5,
                        symbol: 'circle',
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} , {point.y} 億'
                    }
                }
            },
            series: data,
            colors: colors
        });

    }

    modules.renderMultipleBarChart = function (container, dataXAxis, colors, redLineValue,
                                               textYAxis_item1, textYAxis_item2, data, unit) {
        Highcharts.chart(container, {
            chart: {
                type: 'bar',
                height: 700,
                title: '',
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false,
            },
            xAxis: {
                categories: dataXAxis,
                title: {
                    text: '',
                },
                labels: {
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + unit;
                        }
                    }
                }
            },
            yAxis: [{
                offset: 0,
                width: 400,
                labels: {
                    format: '{value}.0%'
                },
                title: {
                    text: textYAxis_item1,
                    align: 'left',
                },
                tickInterval: 5,
                plotLines: [{
                    color: '#dbb8ff',
                    value: redLineValue,
                    width: '2',
                    zIndex: 4,
                    y: 10,
                }]
            }, {
                offset: 0,
                left: 570,
                width: 300,
                labels: {
                    format: '{value}.0%'
                },
                title: {
                    text: textYAxis_item2,
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: 30,
                    x: 10,
                },
                tickInterval: 4,
            }],
            series: data,
            colors: colors,
        })
    }

    modules.render3dColumnChart = function (container, colors, dataXAxis, dataYAxis, labelLegend, unit,
                                            titleYAxis = null, valueChangeColor = null) {
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                height: 500,
                options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: 0,
                    depth: 50
                }
            },
            title: {
                text: ''
            },
            colors: colors,
            subtitle: {
                text: ''
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            legend: {
                enabled: labelLegend,
                align: 'right',
                x: -120,
                verticalAlign: 'top',
                y: 50,
                floating: true,
                borderColor: '#969696',
                borderWidth: 1,
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false,
                labelFormatter: function () {
                    return labelLegend;
                }
            },
            tooltip: {
                valueSuffix: unit,
            },
            plotOptions: {
                column: {
                    depth: 30,
                    zones: [{
                        value: valueChangeColor,
                        color: valueChangeColor === null ? colors[0] : colors[1]
                    },{
                        color: colors[0]
                    }]
                },
                series: {
                    pointWidth: 20,
                    dataLabels: {
                        enabled: true,
                        formatter:function(){
                            return '<span style="color: ' + (this.y < 0 ? 'red' : '#3c3b3b') + '; font-weight: 200">' +
                              this.y + '</span>'
                        },
                    }
                }
            },
            xAxis: {
                categories: dataXAxis,
                labels: {
                    skew3d: true,
                    formatter: function () {
                        return this.value.replace(/(.{1})/g, "$1<br>");
                    },
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                }
            },
            yAxis: {
                top: '5%',
                height: '95%',
                offset: 0,
                title: {
                    text: titleYAxis,
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: -10,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#050104',
                    }
                },
                labels: {
                    overflow: 'justify',
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                }
            },
            series: dataYAxis
        });
    }

    modules.renderLineColumnChart = function (container, colors, dataXAxis, dataYAxis, subtitle = null, titleYAxis = null) {
        Highcharts.setOptions({
            lang: {
                numericSymbols: null,
                thousandsSep: ','
            }
        });

        Highcharts.chart(container, {
            chart: {
                zoomType: 'xy',
                height: 500,
            },
            title: {
                text: ''
            },
            subtitle: {
                text: subtitle
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            colors: colors,
            xAxis: [{
                title: {
                    text: '',
                    align: 'high'
                },
                lineColor: 'transparent',
                categories: dataXAxis,
                crosshair: true
            }],
            yAxis: [{
                labels: {
                    formatter: function() {
                        return '<span style="color: ' + (this.value < 0 ? 'red' : '#3c3b3b') + '">' +
                          Highcharts.numberFormat(this.value, 0, '.', ',') + '</span>';
                    }
                },
                tickInterval: 20000,
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#050104',
                tickPosition: 'inside',
                gridLineWidth: 0,
                lineColor: '#050104',
                lineWidth: 1,
                plotLines: [{
                    color: '#050104',
                    value: 0,
                    width: '1',
                    zIndex: 4
                }],
                title: {
                    text: titleYAxis,
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: -10,
                    style: {
                        fontWeight: '500',
                        color: '#050104',
                    }
                }
            }, {
                title: {
                    text: '',
                },
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#050104',
                tickPosition: 'inside',
                tickInterval: 200,
                gridLineWidth: 0,
                lineColor: '#050104',
                lineWidth: 1,
                labels: {
                    formatter: function() {
                        return '<span style="color: ' + (this.value < 0 ? 'red' : '#3c3b3b') + '">' +
                          Highcharts.numberFormat(this.value, 0, '.', ',') + '</span>';
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 400,
                floating: true,
                useHTML: true,
                symbolHeight: 7,
                symbolWidth: 20,
                symbolRadius: 0,
                squareSymbol: false,
            },
            plotOptions: {
                series: {
                    pointWidth: 7,
                    lineWidth: 3,
                    marker: {
                        enabled: false
                    }
                }
            },
            series: dataYAxis
        });
    }

    modules.renderScatterChartLine = function (container,data,colors,text_xAxis,text_yAxis) {
        Highcharts.chart(container, {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                styledMode: false,
                width: 800,
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: text_xAxis
                },
                gridLineWidth: 1,
                tickInterval: 400,
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: text_yAxis
                },
                gridLineWidth: 1,
                tickInterval: 10,
                plotLines: [{
                    color: '#e6878c',
                    dashStyle: 'Solid',
                    value: 100,
                    width: '1',
                    zIndex: 4,
                    label: {
                        useHTML: true,
                        text: '<span class="material-icons over">navigation</span>\n' +
                            '<span class="material-icons under">navigation</span><p class="text_custom">M/N</p>',
                        align: 'right',
                        x:30,
                        y:-3,
                    },
                }],
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false,
                useHTML:true,
                x: 300,
                y: -10,
                title: {
                    text: '<span style="font-size: 15px;font-weight: 200">【貴社株保有12社】</span>',
                },
                verticalAlign: 'top',
                floating: false,
                reversed: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 0,
                labelFormatter: function () {
                    return '<span style="color:' + this.color + '">' + this.name + '</span>';
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        formatter:function(){
                            return '<span style="color:' + this.color + '">' + this.series.name + '</span>';
                        },
                        allowOverlap:false,
                        align: 'center',
                        crop: false,
                        overflow: 'none',
                    }
                },
                scatter: {
                    marker: {
                        radius: 5,
                        symbol: 'circle',
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} , {point.y} 億'
                    }
                }
            },
            series: data,
            colors: colors
        });
    }

    modules.renderSpiderwebChart = function (container) {
        Highcharts.chart(container, {
            chart: {
                polar: true,
                type: 'line',
                height: 250
            },
            title: {
                text: '',
                x: -80
            },
            pane: {
                size: '85%'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: ['配当利回り平均','株価収益率平均','Beta','売上高増加平均','株価純資産倍率平均', '株価モメンタム平均', '相対力指数平均'],
                labels: {
                    style: {
                        fontWeight: 'bold',
                        color: '#050104',
                    }
                },
                gridLineColor: '#666e88',
                gridZIndex: 4,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                gridLineColor: '#666e88',
                lineWidth: 0,
                min: 0,
                gridZIndex: 4,
                tickAmount: 1,
                labels: {
                    enabled: false
                }
            },
            tooltip: {
                shared: false,
                formatter: function() {
                    return '<br>' + this.key + '</b>: ' + this.point.y
                }
            },
            legend: {
               enabled: false,
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                    },
                },
            },
            series: [{
                data: [14,10,1,7, 11, 77, 55],
                pointPlacement: 'on',
                type: 'area',
                color: 'red',
                fillColor: '#fed0d0',
                lineWidth: 1,
            }]
        });
    }

    return modules;
})(window.jQuery, window, document);