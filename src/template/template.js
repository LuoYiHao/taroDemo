import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './template.less'

class Template extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      
    }
  }

  render () {
    return (
      <View className='template'>
        <Text>Template</Text>
      </View>
    )
  }
}

export default Template
