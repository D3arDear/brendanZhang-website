import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
require('whatwg-fetch')

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      editPost: {
        id: '',
        title: '测试标题改动',
        tags: '测试tag改动/tag',
        introduce: '测试说明改动',
        content: '#测试内容'
      },
      tableData: [],
      search: '',
      editFlag: false
    },
    mutations: {
      SET_USER: function(state, user) {
        state.authUser = user
      },
      search(state, payload) {
        state.search = payload
      },
      gotAllPosts(state, payload) {
        state.tableData = payload
      },
      switchToCurrent(state, payload) {
        state.editPost = payload
      },
      switchEditFlag(state, payload) {
        state.editFlag = payload
      }
    },
    actions: {
      getAllPosts(context, args) {
        axios
          .get('/admin/api/all')
          .then(res => {
            let tableData = res.data.data
            for (let i in tableData) {
              let date = tableData[i].createdAt.split(' ')[0]
              tableData[i].date = date
            }
            return tableData
          })
          .then(tableData => {
            context.commit('gotAllPosts', tableData)
            return tableData
          })
      }
    }
  })

export default store