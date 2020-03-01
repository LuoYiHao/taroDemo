import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './foodList.less'
import AddCut from '../addCut/addCut';

class FoodList extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      
    }
  }

 //require只能引用静态资源
  render () {
    let { selectData,currentList } = this.props
    return (
      <View className='foodList'>
        <Text>{selectData&&selectData.name}</Text>
        <View className='foodList_for'>
          {currentList&&currentList.map((item)=>{
            return (
              <View className='foodList_item'>
                {/* 不能写成以下形式，编译成小程序会报错 */}
                {/* require((item.count==2)?'../../assets/img/2.jpg':'../../assets/img/1.jpg') */}
                <Image className='foodList_item_img' src={item.count==2?require('../../assets/img/2.jpg'):require('../../assets/img/1.jpg')}></Image>
                <View className='foodList_item_info'>
                  <Text>{item.title}</Text>
                  <Text>卖出：{item.sale}</Text>
                  <Text className='price'>¥{item.price}</Text>
                  <AddCut food={item}/>
                </View>    
              </View>
            )
          })
          }
        </View>
      </View>
    )
  }
}

export default FoodList
