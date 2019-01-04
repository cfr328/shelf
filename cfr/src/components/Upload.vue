<template>
    <ul>
        <li v-for="(item, index) in list" :key="index" @click="click(index)">
            <img v-if="item.src" :src="item.src">
            <img v-else class="add" :src="addImg">
            <p>{{item.desc}}</p>
        </li>
        <div v-show="showMask" class="mask">
            <img :src="current.demo">
            <div>
                <button @click="upload(1)">拍照</button>
                <button @click="upload(2)">相册</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </ul>
</template>

<script>
import{mapState, mapMutations} from 'vuex';
import {uploadImg} from '@/api/index';
import add from '@/assets/add.png';
export default {
    data(){
        return {
            current: {},
            showMask: false
        }
    },
    name: 'Upload',
    computed: {
        ...mapState({
            list: state=>state.upload.list
        }),
        addImg(){
            return add;
        }
    },
    methods: {
        ...mapMutations({
            updateList: 'upload/updateList'
        }),
        click(index){
            this.current = this.list[index];
            this.showMask = true;
        },
        cancel(){
            this.showMask = false;
        },
        async upload(type){
            let res = await uploadImg(type)
            if (res.result == 1){
                this.updateList({
                    src: res.data.url,
                    index: this.list.findIndex(item=>item==this.current)
                })
                this.showMask = false;
            }else{
                alert('上传图片失败')
            }
            // let index = this.list.findIndex(item=>item==this.current)
            // this.updateList({
            //     index,
            //     src: res.data.url
            // })
            // this.showMask = false
            // uploadImg(type).then(res=>{
            //     if(res.code == 0){
            //         let src = '';
            //         if(/picture.eclicks.cn/.test(res.data.image01)) {
            //             src = res.data.image01.replace('http://', '//');
            //         } else {
            //             src = '//picture.eclicks.cn/' + res.data.image01;
            //         }
            //         this.updateList({
            //             src,
            //             index: this.list.findIndex(item=>item==this.current)
            //         })
            //     }else{
            //         alert(res.msg)
            //     }
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        background: #fff;
        padding: 14px 0 10px 0;
    }
    li{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            border-radius: 6px;
            // width: 70px;
            // height: 50px;
            display: inline-block;
            border: 1px solid #c0c0c0;
            
        }
        p{
            padding: 8px;
            text-align: center;
            font-size: 16px;
        }
        .add{
            width: 54px;
            height: 40px;
            padding: 5px 12px;
        }
    }
    .mask{
        position: absolute;
        background: rgba(0, 0, 0, .3);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        z-index: 30;
        img{
            width: 90%;
            margin-top: 40px;
        }
        div{
            width: 90%;
            button{
                width: 100%;
                height: 40px;
                background: #fff;
                border: 0;
                color: #3aaffd;
                font-size: 16px;
                border-radius: 8px;
                &:last-child{
                    margin: 10px 0;
                }
                &:first-child{
                    border-radius: 8px 8px 0  0;
                }
                &:nth-child(2){
                    border-radius: 0 0 8px 8px;
                }
            }
        }
    }
</style>