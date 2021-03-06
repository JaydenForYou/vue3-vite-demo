<template>
  <div v-if="showTags" class="tags">
    <ul>
      <li
          v-for="(item,index) in state.tagsList"
          :key="index"
          class="tags-li"
          :class="{'active': isActive(item.path)}"
      >
        <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
                    <i class="el-icon-close"></i>
                </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {store} from "@/store"
import {useRoute, useRouter} from 'vue-router'
import {computed, defineComponent, onMounted, reactive, watch} from "vue"

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    // 初始化变量
    const state = reactive({
      tagsList: computed(() => store.state.Layout.tagsList),
    })

    // 是否展示标签
    const showTags = computed(() => state.tagsList.length > 0)

    // 设置标签路由信息
    const setTags = (route) => {
      if (!route.name) {
        return
      }
      const isExist = state.tagsList.some(item => {
        return item.path === route.fullPath
      })

      if (!isExist) {
        if (state.tagsList.length >= 8) {
          store.commit("Layout/delTagsItem", {index: 0})
        }
        store.commit("Layout/setTagsItem", {
          name: route.name,
          title: route.meta.title,
          path: route.fullPath
        })
      }
    }

    // 关闭单个标签
    const closeTags = (index) => {
      const delItem = this.tagsList[index]
      store.commit("Layout/delTagsItem", {index})
      const item = state.tagsList[index] ? state.tagsList[index] : state.tagsList[index - 1]
      if (item) {
        delItem.path === route.fullPath &&
        this.$router.push(item.path)
      } else {
        this.$router.push("/")
      }
    }

    const isActive = (path) => {
      return path === route.fullPath
    }

    // 关闭全部标签
    const closeAll = () => {
      store.commit("Layout/clearTags")
      router.push('/')
    }
    // 关闭其他标签
    const closeOther = () => {
      const curItem = state.tagsList.filter(item => {
        return item.path === route.fullPath
      })
      store.commit("Layout/closeTagsOther", curItem)
    }

    const handleTags = (command) => {
      command === "other" ? closeOther() : closeAll()
    }

    onMounted(() => {
      // 设置当前标签路由信息
      setTags(route)
    })

    // 监听路由回调
    watch(
        () => route.path,
        () => {
          setTags(route)
        }
    )

    return {
      state,
      closeTags,
      isActive,
      closeOther,
      closeAll,
      handleTags,
      showTags
    }
  }
})
</script>


<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
