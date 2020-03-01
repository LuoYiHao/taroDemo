import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './addCut.less'
import { getEvent, getFoodCount, setFoodCount } from '../../utils/common'

const event = getEvent()

class AddCut extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      num:0
    }
  }

  componentDidMount(){
    let num = getFoodCount(this.props.food)
    this.setState({num:num})
    //监听
    event.on('changeCat',()=>{
      this.setState({num:getFoodCount(this.props.food)})
    })
  }

  add(){
    setFoodCount(this.props.food,this.state.num,'add',()=>{
      this.setState({num:getFoodCount(this.props.food)},()=>{
        event.emit('addCut')
        event.emit('clickAgain')
      })
      
    })
  }

  sub(){
    if(this.state.num > 0){
      setFoodCount(this.props.food,this.state.num,'sub',()=>{
        this.setState({num:getFoodCount(this.props.food)})
        event.emit('addCut')
        event.emit('clickAgain')
      })
    }else{
      console.error('减少菜品出现异常')
    }
  }

  render () {
    let { num } = this.state
    return (
      <View className='addCut'>
        {/* 两种不同的绑定事件方式 */}
        <Text className={'op_img '+(num>0?'':'hide')} onClick={this.sub.bind(this)}>-</Text>
        <Text className={'num '+(num>0?'':'hide')}>{num}</Text>
        <Text className='op_img' onClick={(e)=>this.add(e)}>+</Text>
      </View>
    )
  }
}

export default AddCut
