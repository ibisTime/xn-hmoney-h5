import fetch from 'common/js/fetch';

//获取游戏地址
export function gramUrl() {
    return fetch("600101", {}, true)
} 

// 获取游戏余额
export function gramMoney() {
    return fetch("600104", {}, true);
}