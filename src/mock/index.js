import Mock from "mockjs";
import homeApi from "./home";
import userApi from "./user";

// 设置200-2000的延迟
Mock.setup({
    timeout: "200-2000"
})

Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData);
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList);
Mock.mock(/\/user\/delete/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)