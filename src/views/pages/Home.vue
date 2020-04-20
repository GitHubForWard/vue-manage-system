<template>
  <el-row :gutter="10">
    <!-- left -->
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
      <el-card shadow="hover">
        <div class="userInfo">
          <el-avatar :src="userAvatar" :size="150"></el-avatar>
          <div>
            <p>Forward</p>
            <p>超级管理员</p>
          </div>
        </div>
        <el-divider></el-divider>
        <el-row class="loginInfo">
          <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="8">
            <i>上次登录时间：</i>
            {{ lastTime }}
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="8">
            <i>上次登录地点：</i>
            {{ lastCity }}
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-table :data="sellData" v-loading="loading">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- right -->
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
          v-for="item in orderData"
          :key="item.name"
        >
          <el-card shadow="hover" class="order" :body-style="{ padding: 0 }">
            <div>
              <i :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
              <span class="detail">
                <span>
                  <p class="num">
                    ￥
                    <countTo :startVal="0" :endVal="item.value" :duration="2000"></countTo>
                  </p>
                  <p class="txt">{{ item.name }}</p>
                </span>
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card shadow="hover">
        <echarts :chartData="echartData.order" style="height: 280px"></echarts>
      </el-card>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-card shadow="hover">
            <echarts style="height: 240px" :chartData="echartData.user" :isAxisChart="false"></echarts>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-card shadow="hover">
            <echarts style="height: 240px" :chartData="echartData.video" :isAxisChart="false"></echarts>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Echarts from "./../../components/layout/Echarts";
import CountTo from "vue-count-to";
export default {
  components: {
    Echarts,
    CountTo
  },
  data() {
    return {
      userAvatar: require("./../../assets/images/user.png"),
      loading: true,
      lastTime: "",
      lastCity: "",
      sellData: [],
      orderData: [],
      tableLabel: {},
      echartData: {
        order: {
          xData: [],
          legend: [],
          series: []
        },
        user: {},
        video: {}
      }
    };
  },
  methods: {
    getStatisticalData() {
      this.$http.get("/home/getData").then(res => {
        const data = res.data;
        console.log("统计数据", res);
        this.lastTime = data.lastTime;
        this.lastCity = data.lastCity;
        this.sellData = data.tableData;
        this.orderData = data.orderData;
        this.tableLabel = data.tableLabel;
        // 折线图
        const order = res.data.echartData.lineChart;
        this.echartData.order.xData = order.date;
        let keyArr = Object.keys(order.data[0]);
        keyArr.forEach(key => {
          this.echartData.order.series.push({
            name: key,
            type: "line",
            data: order.data.map(item => item[key])
          });
        });
        this.echartData.order.legend = keyArr;
        // 柱状图
        this.echartData.user = res.data.echartData.barChart;
        // 饼状图
        this.echartData.video = res.data.echartData.breadChart;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getStatisticalData();
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

.userInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    text-align: center;
    p {
      &:first-child {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 0.5em;
      }
      &:last-child {
        color: #999;
      }
    }
  }
}
.loginInfo {
  line-height: 30px;
  text-align: left;
  font-size: 14px;
  i {
    color: #999;
  }
}
.order {
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      color: #fff;
      text-align: center;
    }
    .detail {
      display: flex;
      flex: 1;
      padding-left: 15px;
      text-align: left;
      .num {
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .txt {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>