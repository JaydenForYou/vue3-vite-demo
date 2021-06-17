<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
              effect="dark"
              :content="state.message?`有${state.message}条未读消息`:`消息中心`"
              placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span v-if="state.message" class="btn-bell-badge"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/img/img.jpg" alt=""/>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/JaydenForYou/vue3-vite-demo" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import {store} from "@/store"
import {computed, getCurrentInstance, onMounted, reactive} from "vue"
import storage from "@/utils/storage"

const {getSession} = storage

export default {
  setup() {
    const {proxy} = getCurrentInstance()
    const state = reactive({
      name: "fuzzy",
      message: 2
    })

    // 用户名下拉菜单选择事件
    const handleCommand = (command) => {
      if (command === "loginOut") {
        proxy.$router.push('/login')
      }
    }
    // 侧边栏折叠
    const collapseChange = () => {
      store.commit("Layout/handleCollapse", !collapse.value)
    }

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChange()
      }
    })

    const username = computed(() => {
      let userInfo = getSession("userInfo")
      return userInfo ? userInfo.username : state.name
    })

    const collapse = computed(() => {
      return store.state.Layout.collapse
    })

    return {
      state,
      handleCommand,
      username,
      collapse,
      collapseChange
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
