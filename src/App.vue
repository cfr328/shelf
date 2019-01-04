<template>
  <div class='wrap'>
    <div class='header'>
      <div class='active'>订单提交</div>
      <div class='active_no'>填写收获地址</div>
      <div class='active_no'>正在办理</div>
      <div class='active_no'>办理完成</div>
    </div>
    <div class='swipe'>
      <img src='./assets/banner@3x.png'>
      <p>
        已有
        <span></span>
        个用户在车轮补换驾照成功
      </p>
    </div>

    <Upload/>
    <div class='lists'>
      <div class='car_splice'>
        <p>服务类型<span class='help'></span></p>
        <span @click="clickType">{{type}}<em>></em></span>
        
      </div>
      <div>
        <p>当前驾照签发城市</p>
        <input placeholder='请选择签发地' @click="clickCity" />
        {{info.city.join(' ')}}
      </div>
      <div>
        <p>可补换的签发城市</p>
        <input placeholder='请选择签发地'/>
      </div>
      <div class='line'>
        <span>服务费</span>
        <span class='price'>￥399</span>
      </div>
    </div>
    
    <van-popup v-model="showType" position="bottom" overlay>
        <van-picker :columns="typeArray" @cancel="onCancel" show-toolbar title="请选择服务类型"  @confirm="onConfirm"/>
    </van-popup>
    <van-popup v-model="showCity" position="bottom" overlay>
        <van-picker :columns="cityArray" @cancel="onCancel" show-toolbar title="当前签发城市" @change='cityChange' ref="cityPicker" @confirm="cityConfirm"/>
    </van-popup>
    <div class='last'>
        <span>优惠</span>
        <span>></span>
    </div>
    <p class='txt'>常见问题</p>
    <footer>
      <p>实付: <span>￥399</span></p>
      <button>立即支付</button>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapGetters, mapMutations, mapActions } from 'vuex';

import Upload from '@/components/Upload';  //引入组件Upload
import {cityList, constList} from '@/api/index';

export default {
  name: 'app',
  data() {
    return {
      show: false,
      showType: false, //是否显示组件
      showCity: false,
      typeArray: ["补驾照", "换驾照"],
      cityList: [],  //当前驾照签发城市
      cityArray: [],  //可补换签发城市
      type: '换驾照',
      info: {
        type: '',
        city: []
      }
    }
  },
  created() {
    this.getCityList()
  },
  components: { //挂载组件
    Upload
  },
  computed:{
    ...mapState({
      num: state => state.app.num
    }),
    ...mapGetters({
      formatNum: 'app/formatNum'
    })
  },
  //()
  mounted(){
    console.log(this.$store, 'this.$store')
  },
  methods: {
    ...mapMutations({
      changeNum: 'app/changeNum'
    }),
    ...mapActions({
      changeNumAsync: 'app/changeNumAsync'
    }),
    changeNum(type){
      this.changeNumAsync(type).then(res => {
        console.log(type, 'type')
         console.log('异步操作完成')
      })
    },
    //换驾照
    clickType(){ //显示蒙层
      this.showType = true;
    },
    onCancel(){ //取消
      this.showType = false;
    
    },
    onConfirm(value){ //确认
      this.type = value;
      this.onCancel()
    },
    //当前驾照签发城市
    clickCity(){
      this.showCity = true;
    },
    //
    async getCityList(){
      let res = await cityList(); //获取数据
      res.data.forEach(item=>{
        item.list.forEach(value=>{
          delete value.list;
        })
      })
      this.cityList = res.data;

      this.cityArray = [{
        values: this.cityList.map(item=>item.name)
      },{
        values: this.cityList[0].list.map(item=>item.name)
      }]
    },
    async getCosList(){ },
    cityChange(picker, values){
      let index = this.cityList.findIndex(item=>item.name == values[0]);
      this.cityArray[1].values = this.cityList[index].list.map(item=>item.name)
      this.$refs.cityPicker.setColumnValues(1, this.cityList[index].list.map(item=>item.name))
    },
    cityConfirm(values){
      this.info.city = values;
      this.showCity = false;
    }
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    color: #3d4145;
  }
  html, body{
    width: 100%;
    height: 100%;
  } 
  .wrap{
    width: 100%;
    height: 100%;
    background: #eee;
  }
  .header{
    width: 100%;
    height:46px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    &>div{
      font-size: 16px;
      color: #3aaffd;
      flex: 1;
      text-align: center;
      line-height: 46px;
      flex-basis: auto;
      position: relative;
      font-size: 16px;
    }
    .active{
      background: #3aaffd;
      color: #fff;
      // height: 100%;
      position: relative;
      &:after{
        content: '';
        // display: block;
        // position: absolute;
        // border-top: .5rem solid #fff;
        // border-bottom: .5rem solid #fff;
        // border-left: .15rem solid red;
        // top: 0;
        // right: -.1rem;
        //z-index: 4;
            // width:0;
            // height:0;
            // border-width:0.4rem 0 0.4rem 0.2rem;
            // border-style:solid;
            // border-color:transparent transparent transparent red;/*透明 透明 透明 灰*/
            // position: absolute;
            // top: 0;
            // right: -.02rem;
            // z-index: 99;

      }
    }
    .active_no{
  
    }
  }
  .car_splice{
    em{
      font-style: normal;
      color: #ccc;
    }
    .help{
      display: inline-block;
      //background: url()
    }
  }
  .swipe{
    width: 100%;
    height: 100px;
    background: #eee;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    p{
      color: #fb611f;
      text-align: center;
      position: absolute;
      width: 100%;
      left: 0;
      top: 20px;
      font-size: 16px;
    }
  }
  .txt{
    width: 100%;
    text-align: center;
    color: #3aaffd;
  }
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    font-size: .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      padding-left: 10px;
      font-size: 16px;
      span{
        color: red;
      }
    }
    button{
      background: #999;
      width: 90px;
      height: 50px;
      border: 0;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .lists{
    border-top: 10px solid #eee;
    width: 100%;
    background: #fff;
    div{
      // width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      margin-left: 10px;
      padding-right: 10px;
      //font-size: .3rem;
      font-size: 18px;
      .price{
        color: #ff443f;
      }
    }
    input{
      border: 0;
      max-width: 2.6rem;
      text-align: right;
      text-overflow: ellipsis;
      font-size: 16px;
    } 
  }
  .last{
      width: 100%;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 18px;
      margin-top: 10px;
  }
  
</style>


