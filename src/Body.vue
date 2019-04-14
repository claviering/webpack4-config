<template>
  <div class="app">
    <h1>Body</h1>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
import _ from "lodash";
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
      name: "name"
    };
    let gender = {
      gender: "1"
    };
    Object.assign;
  },
  methods: {
    doMore() {
      console.log("doMore");
      this.$router.push("/MyMain");
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
