import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './cata.less'
import { getEvent } from '../../utils/common'

const event = getEvent()

class Cata extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      cata:[
        {
          name:'专场',
          id:1,
        },
        {
          name:'热销',
          id:2,
        },
        {
          name:'折扣',
          id:3,
        },
        {
          name:'主食',
          id:4,
        },
        {
          name:'热炒',
          id:5,
        },
        {
          name:'凉菜',
          id:6,
        },
        {
          name:'特色菜',
          id:7,
        },
      ],
      selectData:null,
      random:0,
    }
  }

  handleChange(item){
    if((this.state.selectData&&this.state.selectData.id!=item.id)||(!this.state.selectData)){
      //异步执行
      this.setState({selectData:item},()=>{
        //短路表达式
        this.props.onChange&&this.props.onChange(this.state.selectData)
      })

    }
    event.emit('changeCat')

  }

  componentDidMount(){
    this.handleChange({
      name:'专场',
      id:1,
    }) 
    event.on('clickAgain',()=>{
      this.handleChange(this.state.selectData)
    })
  }

  render () {
    let { cata, selectData} = this.state
    return (
      <View className='cata'>
        {
          //循环数组不能放到render外，否则小程序不兼容
          cata.map((item,index)=>{
            return <Text onClick={this.handleChange.bind(this,item)} key={item.id} className={'cata_name '+((selectData&&(selectData.id==item.id))?'select':'')}>{item.name}</Text>
          })
        }
      </View>
    )
  }
}

export default Cata
