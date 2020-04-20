import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        tabList: [
            {
                path: "/",
                label: "首页",
                name: "home",
                icon: "s-home",
                id: 1000
            }
        ]
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name === 'home') {
                state.currentMenu = null;
            } else {
                state.currentMenu = val;
                let idx = state.tabList.findIndex(item => item.name === val.name);
                idx === -1 ? state.tabList.push(val) : ''
                Cookie.set('currentMenu', JSON.stringify(state.currentMenu));
            }
            Cookie.set('reuseTab', JSON.stringify(state.tabList));
        },
        getMenu(state) {
            // console.log(JSON.parse(Cookie.get('currentMenu')));
            if (Cookie.get('reuseTab')) {
                state.tabList = JSON.parse(Cookie.get('reuseTab'));
                state.currentMenu = Cookie.get('currentMenu');
            }
            if (Cookie.get('currentMenu')) {
                state.currentMenu = JSON.parse(Cookie.get('currentMenu'));
            }
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        closeTab(state, val) {
            const result = state.tabList.findIndex(item => item === val);
            if (result !== -1) {
                state.tabList.splice(result, 1);
                Cookie.set('reuseTab', JSON.stringify(state.tabList))
            }
        }
    },
    actions: {}
}