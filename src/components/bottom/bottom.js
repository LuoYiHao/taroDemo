import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './bottom.less'
import { getAllFoodInfo, getEvent } from '../../utils/common'

const event = getEvent()

class Bottom extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      num:0,
      sendPrice:3,
      supportTakeBySelf:false,
      sendMustPrice:20,
      allPrice:0
    }
  }

  componentDidMount(){
    let { allNum, allPrice } = getAllFoodInfo()
    this.setState({num:allNum,allPrice:allPrice})

    event.on('addCut',()=>{
      let { allNum, allPrice } = getAllFoodInfo()
      this.setState({num:allNum,allPrice:allPrice})
    })
  }

  render () {
    let { num, sendPrice, supportTakeBySelf, sendMustPrice , allPrice} = this.state
    return (
      <View className='bottom'>
        <View className='bottom_body'>
          {/* 条件渲染 */}
          {num>0?<Text className='num'>{num}</Text>:null}
          <Image className='img' src={allPrice?require('../../assets/img/foodstore.png'):require('../../assets/img/emptystore.png')}></Image>
          <View className='info'>
            {/* 条件渲染 */}
            {allPrice?<Text className='price'>¥{allPrice}</Text>:<Text>{sendPrice?'另需配送费¥'+sendPrice+' | ':''}</Text>}
            <Text>{supportTakeBySelf?'支持自取':'不支持自取'}</Text>
          </View>
          <View className='submit'>
            {allPrice>=sendMustPrice?<Text className='goPay'>去结算</Text>:<Text>{sendMustPrice?'¥'+sendMustPrice+'起送':''}</Text>}
          </View>
        </View>
      </View>
    )
  }
}

export default Bottom
