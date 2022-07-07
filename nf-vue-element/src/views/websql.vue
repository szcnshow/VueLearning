<template>
  <div class="home">
    websql的尝试 <br>

    <input type="button" @click="sqlCreate" value="建表"><br>
    <input type="button" @click="addData" value="添加"><br>
    <input type="button" @click="zsgc" value="修改、删除"><br>
    <input type="button" @click="sqlSelect" value="读取sql"><br>
    <template v-for="(item, index) in dataList" :key="index">
      {{item}}<br>
    </template>

  </div>
</template>

<script>
// @ is an alias to /src
import WebSqlHelp from '@/store-nf/websql-help.js'
import { reactive } from 'vue'

export default {
  name: 'websql',
  components: {
  },
  setup (props, ctx) {
    const help = new WebSqlHelp('dbfindtest', 3, '演示一下查询控件')
    console.log(help)
    const person = {
      name: 'jyk',
      age: 18,
      brithday: '1970-1-1',
      aa: {
        a1: 'a111',
        a2: 'a222'
      }
    }

    // 显示查询数据
    const dataList = reactive([])
    const retPerson = reactive({
      name: 'jyk-ret',
      age: 18,
      brithday: '1970-1-1',
      createdate: new Date()
    })

    // person表 的实例
    const tblPerson = new help.CreateTableObject('person9', retPerson)
    const tblPerson3 = new help.CreateTableObject('person3', person)

    // 建立表
    const sqlCreate = () => {
      // 依据 person 建立一个表
      help.createTable('person', person)
      help.createTable('person3', person)

      // help.createTable('person3', person).then(() => {
      // 往表里面加数据
      // help.insert('person3', person).then((id) => {
      //   console.log('newId', id)
      // })
      // })
    }

    // 添加数据
    const addData = () => {
      retPerson.createdate = '2021-01-01'
      tblPerson.insert().then((id) => {
        console.log('newId--ret--', id)
      })
      tblPerson3.insert({
        name: 'jyk33333',
        age: 38,
        brithday: new Date()
      }).then((id) => {
        console.log('newId--date--', id)
      })
    }

    // 修改和删除
    const zsgc = () => {
      // 修改指定的数据
      person.age = 111
      help.update('person3', person, 3).then((id) => {
        console.log('updateId', id)
      })
      // 删除指定的数据
      help.delete('person3', 4).then((id) => {
        console.log('deleteId', id)
      })
    }

    // 查询
    const sqlSelect = () => {
      // 查询数据
      help.select('person9', {}, {
        // id: [441, [1, 2, 3, 5, 6, 7, 8]]
      }, {
        pageIndex: 1,
        pageSize: 20,
        orderBy: 'id'
        // isAsc: true
      }).then((data) => {
        console.log('select:', data)
        dataList.length = 0
        dataList.push(...data)
      })

      // help.deleteTable('person3').then((data) => {
      //   console.log('deleteTable:', data)
      // })
    }

    return {
      sqlCreate,
      addData,
      sqlSelect,
      zsgc,
      dataList,
      retPerson
    }
  }

}
</script>
