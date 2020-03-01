import Taro from '@tarojs/taro'
import Event from './event'
const key = 'meituan'
//公共函数
export function getFoodCount(food){
    //读缓存
    let store = Taro.getStorageSync(key)
    if(store&&store[food.id]){
        return store[food.id].num
    }else{
        return 0
    }
}

export function setFoodCount(food,num,type,cb){
    let store = Taro.getStorageSync(key)
    //给store赋空对象初值
    if(!store) store = {}

    if(store&&store[food.id]){
        if(type=='sub'){
            if(num==1){
                //从缓存中删除数据结构
                delete store[food.id]
            }else{
                store[food.id].num = num - 1;
            }
        }else{
            store[food.id].num = num + 1;
        }
    }else{
        //合并属性
        store[food.id] = { num:1, ...food }
    }
    //设置缓存
    Taro.setStorageSync(key,store)
    cb && cb()
}

export function getAllFoodInfo(){
    let allNum = 0
    let allPrice = 0
    let store = Taro.getStorageSync(key)
    if(store){
        //遍历对象的key
        Object.keys(store).map((key)=>{
            if(store[key]){
                allPrice += store[key].price * store[key].num
                allNum += store[key].num
            }
        })
    }
    return { allNum, allPrice }
}

const e = new Event()
//必须为单例模式
export function getEvent(){
    return e
}