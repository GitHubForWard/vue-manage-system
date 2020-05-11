import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        menu: [],
        tabList: [
            {
                path: "/home",
                label: "首页",
                name: "home",
                icon: "s-home",
                id: 1000
            }
        ]
    },
    mutations: {
        setMenu(state, val) {
            state.menu = val;
            Cookie.set('menu', JSON.stringify(val));
            console.log(state.menu, 'vuex');
        },
        clearMenu(state) {
            state.menu = [];
            Cookie.remove('menu');
            Cookie.remove('reuseTab');
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return;
            }
            let menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            let currentMenu = [
                {
                    path: '/',
                    component: () => import(`@/views/default/Layout.vue`),
                    children: []
                },
            ];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/pages/${item.url}`);
                        return item;
                    })
                    currentMenu[0].children.push(...item.children);
                } else {
                    item.component = () => import(`@/views/pages/${item.url}`);
                    currentMenu[0].children.push(item);
                }
            })
            router.addRoutes(currentMenu);
        },
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