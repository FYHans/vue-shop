export default {
    state: {
        orderList: []
    },
    mutations: {
        getOrderList(state, orderList) {
            state.orderList = orderList;
            console.log(333, state.orderList);
        }
    },
    action: {
        OrderList(store, orderList) {
            console.log(222);
            store.commit('getOrderList', orderList);
        }
    }
}