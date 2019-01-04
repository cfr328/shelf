const state = {
    num: 10000
}

//模块中派生的数据,可以缓存数据
const getters = {
    formatNum: (state)=>{
        const re=/(?=(?!(\b))(\d{3})+$)/g;
        let str = state.num.toString().replace(re,",");
        return str;
    }
}

//方法
//模块中的同步操作
const mutations = {
    changeNum(state, action){
        state.num = action == '+' ? state.num+1: state.num-1;
        console.log(state.num, 'num')
        console.log(action, 'action')
    }
}

//模块中的异步操作
const actions = {
    changeNumAsync({commit}, action){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                commit({
                    type: 'changeNum',
                    payload: action.payload
                })
                resolve()
            }, 5000)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
//mutation 类似于事件:每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
//通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更