import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Top from './top'
import './head.less'
import Activity from './activity';

class Head extends Component {
  constructor(){
    super(...arguments)

    this.state = {
      store:{
        title:'喵喵喵店',
        bulletin:'欢迎光临，喵~',
        tags:[
          "饭好吃","汤好喝","喵喵喵"
        ]
      }
    }
  }
  
  render () {
    //ES6的解构赋值
    let { store } = this.state
    return (
      <View className='head'>
        <Top />
        <Image className='bg' src={require('../../assets/img/bg.jpg')}></Image>
        <View className='store'>
          <Image className='store_img' src={require('../../assets/img/store.jpg')}></Image>
          <View className='store_text'>
            <Text>{store.title}</Text>
            <Text>{store.bulletin}</Text>
            <View>
              {
                //ES6箭头函数
                store.tags.map((item,index)=><Text key={index} className='store_tags'>{item}</Text>)
                //如果在箭头后面加上花括号，则必须在前面加return
              }
            </View>
          </View>
        </View>
        <Activity />
      </View>
    )
  }
}

export default Head
