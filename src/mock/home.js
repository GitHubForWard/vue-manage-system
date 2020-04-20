import Mock from "mockjs";

let chartData = [];

export default {
    getStatisticalData: () => {
        for (let i = 0; i < 12; i++) {
            chartData.push(
                Mock.mock({
                    vue: Mock.Random.float(100, 5000, 0, 2),
                    react: Mock.Random.float(100, 5000, 0, 2),
                    angular: Mock.Random.float(100, 5000, 0, 2),
                    bootstrap: Mock.Random.float(100, 5000, 0, 2),
                    webpack: Mock.Random.float(100, 5000, 0, 2)
                })
            )
        }
        return {
            code: 20000,
            lastTime: Mock.Random.datetime(),
            lastCity: Mock.Random.city(),
            chartData: chartData,
            tableLabel: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            tableData: [{
                name: 'vue',
                todayBuy: Mock.Random.float(100, 1000, 0, 2),
                monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
            },
            {
                name: 'react',
                todayBuy: Mock.Random.float(100, 1000, 0, 2),
                monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
            },
            {
                name: 'angular',
                todayBuy: Mock.Random.float(100, 1000, 0, 2),
                monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
            },
            {
                name: 'bootstrap',
                todayBuy: Mock.Random.float(100, 1000, 0, 2),
                monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
            },
            {
                name: 'webpack',
                todayBuy: Mock.Random.float(100, 1000, 0, 2),
                monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
            }
            ],
            orderData: [
                {
                    name: "今日支付订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "success",
                    color: Mock.Random.rgb()
                },
                {
                    name: "今日收藏订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "star-on",
                    color: Mock.Random.rgb()
                },
                {
                    name: "今日未支付订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "s-goods",
                    color: Mock.Random.rgb()
                },
                {
                    name: "本月支付订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "coin",
                    color: Mock.Random.rgb()
                },
                {
                    name: "本月收藏订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "magic-stick",
                    color: Mock.Random.rgb()
                },
                {
                    name: "本月未支付订单",
                    value: Mock.Random.natural(10, 1000),
                    icon: "shopping-cart-2",
                    color: Mock.Random.rgb()
                }
            ],
            echartData: {
                lineChart: {
                    date: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    data: chartData
                },
                barChart: {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            ['product', '新增用户', '活跃用户'],
                            ['周一', Mock.Random.integer(50, 1000), Mock.Random.integer(50, 1000)],
                            ['周二', Mock.Random.integer(50, 1000), Mock.Random.integer(50, 1000)],
                            ['周三', Mock.Random.integer(50, 1000), Mock.Random.integer(50, 1000)],
                            ['周四', Mock.Random.integer(50, 1000), Mock.Random.integer(50, 1000)],
                            ['周五', Mock.Random.integer(50, 1000), Mock.Random.integer(50, 1000)]
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        },
                        axisLabel: {
                            color: "#333"
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        }
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        { type: 'bar' },
                        { type: 'bar' },
                    ]
                },
                breadChart: {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 335, name: '直接访问' },
                                { value: 310, name: '邮件营销' },
                                { value: 234, name: '联盟广告' },
                                { value: 135, name: '视频广告' },
                                { value: 1548, name: '搜索引擎' }
                            ]
                        }
                    ]
                }
            }
        }
    }
}