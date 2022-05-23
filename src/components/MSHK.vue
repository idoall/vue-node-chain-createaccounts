<template>
  <b-container>
      <b-jumbotron header="在线生成链上钱包" lead="mshk.top" bg-variant="white">
        <b-form-row>
          <div class="text-left">
              <b-col>
                <b-button variant="outline-primary" @click="changeChain('ETH')">ETH</b-button>
                <b-button variant="outline-primary" @click="changeChain('BSC')">BSC</b-button>
                <b-button variant="outline-primary" @click="changeChain('MATIC')">MATIC</b-button>
                <b-button variant="outline-primary" @click="changeChain('FANTOM')">FANTOM</b-button>
                <h2 class="mt-5 text-primary">批量生成 {{ ChainName }} 钱包</h2>
                <b-icon-broadcast-pin></b-icon-broadcast-pin>&nbsp;&nbsp;<span class="text-warning">钱包生成过程均在本地电脑完成，我们无法获取到您的助记词及私钥！</span>
              </b-col>
          </div>
        </b-form-row>
        <b-form-row>
            <b-col>
              <b-form-input placeholder="输入需要生成的钱包地址个数" v-model="CreateNum"></b-form-input>
            </b-col>
            <b-col cols='2'>
              <b-button block variant="outline-primary" @click="genData">立即生成</b-button>
            </b-col>
        </b-form-row>
        <div id="paenl" v-show="ShowResult">
          <b-form-row>
            <b-col class="text-left">
              <h5 class="mt-5">Created: {{ AccountArray.length }}</h5>
            </b-col>
          </b-form-row>
          <b-form-row class="border-top border-primary" v-for="(item, index) in AccountArray" :key="item.address">
              <b-form inline class="w-100 mt-1">
                <b-col cols="1">
                  <label for="inline-form-input-name">地址{{ index+1 }}</label>
                </b-col>
                <b-col cols="9">
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-100 border-0"
                    readonly
                    placeholder="地址"
                    :value="item.address"
                  ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-button variant="primary" @click="doCopy(item.address)">复制</b-button>
                </b-col>
              </b-form>
              <b-form inline class="w-100 mt-1">
                <b-col cols="1" >
                  <label for="inline-form-input-name">私钥{{ index+1 }}</label>
                </b-col>
                <b-col cols="9">
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-100 border-0"
                    placeholder="私钥"
                    readonly
                    :value="item.privateKey"
                  ></b-form-input>
                </b-col>
                <b-col cols="2">
                  <b-button variant="primary" @click="doCopy(item.privateKey)">复制</b-button>
                </b-col>
              </b-form>
          </b-form-row>
        </div>
      </b-jumbotron>
    </b-container>
</template>

<script>
// import Vue from 'vue'
// import { BButton } from 'bootstrap-vue'
import Web3 from 'web3'
export default {
  name: 'MSHK.TOP',
  data () {
    return {
      msg: '',
      ChainName: 'ETH',
      ShowResult: false,
      CreateNum: 1,
      AccountArray: []
    }
  },
  component: {
    // VueClipboard
    // BButton
  },
  methods: {
    // 改变链的名称
    changeChain (n) {
      this.ChainName = n
    },
    genData () {
      this.ShowResult = true
      this.createAccounts()
    },
    genComponent () {
      // var Btn = Vue.extend(BButton)
      // var btninstance = new Btn()
      // btninstance.props = ['value']
      // console.log(btninstance)
      // btninstance.$mount('#paenl')
    },
    // 开始复制
    doCopy: function (s) {
      this.$copyText(s).then(function (e) {
        console.log(e)
      }, function (e) {
        console.log(e)
      })
    },
    createAccounts () { // 通过助记词创建帐号
      var obj = this
      var accWeb3 = new Web3()
      var accountArray = []
      for (var i = 0; i < obj.CreateNum; i++) {
        accountArray.push(accWeb3.eth.accounts.create(accWeb3.utils.randomHex(32)))
      }
      obj.AccountArray = accountArray
      console.log(accountArray)
    }
  },
  mounted () {
  }
}
</script>
<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
