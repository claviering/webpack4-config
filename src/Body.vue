<template>
  <div class="app">
    <h1>Body</h1>
    <img src="./1.jpeg" alt="">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
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
    console.log('_测试', _.get(name, 'name'))
    this.tmp()
  },
  methods: {
    doMore() {
      console.log("doMore");
    },
    promise1() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('foo');
        }, 20000);
      });
    },
    async tmp() {
      console.log('time start')
      await this.promise1()
      console.log('time end')
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    background-color: yellow;
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
