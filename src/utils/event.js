//事件管理器（事件池）
//面向对象
class Event{
    constructor(){
        this.event = {}
    }

    //监听
    on(eventName,cb){
        if(this.event[eventName]){
            this.event[eventName].push(cb)
        }else{
            this.event[eventName] = [cb]
        }
    }

    //触发
    emit(eventName){
        if(this.event[eventName]){
            this.event[eventName].map((cb)=>{
                cb()
            })
        }
    }
}

export default Event