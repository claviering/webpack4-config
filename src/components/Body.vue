<template>
  <div class="body">
    <h1>Body</h1>
    <h1>{{name}}</h1>
    <h1>{{computedName}}</h1>
    <el-button type="primary" @click="changeName">change name</el-button>
    <router-link to="/body/a">
      <h1>Go To A</h1>
    </router-link>
    <router-link to="/body/b">
      <h1>Go To B</h1>
    </router-link>
    <router-view></router-view>
    <img src="./1.jpeg" alt="">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
import {get} from 'lodash';
export default {
  components: {},
  data() {
    return {
      name: "name",
      showMain: false,
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    let name = {
      name: "your name"
    };
    let gender = {
      gender: "1"
    };
    console.log('_测试', get(name, 'name'))
    this.tmp()
  },
  computed: {
    computedName: function() {
      return 'computedName' + this.name
    }
  },
  watch: {
    $route (to, from){
      console.log('watch route in Body');
      console.log('to', to);
      console.log('from', from);
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave');
    next()
  },
  methods: {
    changeName() {
      this.name = 'change name'
      // this.computedName = 'change computedName' // 报错，computed 的变量没 setter
    },
    doMore() {
      console.log("doMore");
    },
    promise1() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('foo');
        }, 3000);
      });
    },
    async tmp() {
      console.log('time start')
      let start = Date.now()
      await this.promise1()
      let end = (Date.now() - start) / 1000
      console.log('time end', end)
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less">
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    border-radius: 10px;
    text-align: center;
  }
}
.css-shaking {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
