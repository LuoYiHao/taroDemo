import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './food.less'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Cata from './cata'
import FoodList from './foodList'
import { getEvent } from '../../utils/common'

const event = getEvent()

class Food extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      current:0,
      tabList: [
        { title: '点菜' }, 
        { title: '评价' }, 
        { title: '商家' }
      ],
      foodList:[],
      currentList:[],
      selectData:null
    }
  }

  changeTab(val){
    this.setState({current:val})
  }

  changeCata(val){
    this.setState({selectData:val})
    if(this.state.foodList.length!=0&&this.state.foodList.some(item=>item.pid==val.id)){
      //取缓存
      this.setState({currentList:this.state.foodList.filter(item=>item.pid==val.id)},()=>{
        event.emit("changeCat");
      })
    }else{
      //加入到缓存数组
      this.setState({foodList:this.state.foodList.concat(this.getData(val))},()=>{
        this.setState({currentList:this.state.foodList.filter(item=>item.pid==val.id)},()=>{
          event.emit("changeCat");
        })
      })
    }
  }

  getData(item){
    //用round取整
    let count = Math.round(Math.random() * 2)
    //每一类模拟0-20个数据
    //类数组对象转为数组
    return Array.from(
      Array(Math.round(Math.random()*20)) , (v,k)=>
      //加括号
      ({
        title:`类别${item.id}菜品${k+1}`,//记得加1
        pid:item.id,
        id:`${item.id}_${k+1}`,
        count,
        sale:Math.round(Math.random()*60),
        price:Math.round(Math.random()*20)
      })
    )
  }

  render () {
    let { current, tabList, currentList, selectData} = this.state
    return (
      <View className='food'>
        <AtTabs current={current} tabList={tabList} onClick={this.changeTab.bind(this)}>
          <AtTabsPane>
            <View className='food_body'>
              {/* 将函数作为参数传递时，参数名必须要加on */}
              <Cata onChange={this.changeCata.bind(this)}/>
              {/* 设置style兼容小程序 */}
              <FoodList style='width:100%' currentList={currentList} selectData={selectData}/>
            </View>
          </AtTabsPane>
          <AtTabsPane>评价</AtTabsPane>
          <AtTabsPane>商家</AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Food
