<!--
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-01-13 16:52:52
 * @LastEditTime: 2021-01-30 14:09:50
 * @LastEditors: 子非鱼
-->

### 调用示例
```javascipt
    <table-content 
        :search-list="searchList" 
        :table-data="tableData" 
        @search="getTableData" 
        :columns="columns" 
        :showOverflowTooltip="true" 
        :pagination="pagination"
        @change="onChange" 
        :max-height="440">
        <template #action="{ row }">
             <el-button type="text" size="small">查看</el-button>
        </template>
    </table-content>
```


# **字段说明**

|  字段   | 说明  |类型|可选值|默认值|
|  ----  | ----  |---- | ----|----|
| searchText  | 查询按钮文字 |String|--|查询|
| [searchList](#searchList)  | 搜索表单列表 |Array|--|[]|
| [@search](#@search)  | 调用请求数据方法 |Function(params)|--|--|
| [columns](#columns)  | 单元格列定义 |Array|--|[]|
| tableData  | 数据源 |Array|--|[]|
| selection  | 是否需要多选列 |Boolean|--|false|
| [selectChange](#selectChange)  | 选择变化监听 |Function(select)|--|--|
| showOverflowTooltip  | 溢出显示tooltip |Boolean|--|false|
| maxHeight  | 表格最大高度 |Number|--|-|
| pagination  | 分页参数 |Object|{page:1,pageSize:10,total:0}|null|
| [@change](#@change)  | 分页改变监听,需要重新赋值 |Function(pagination)|--|--|
| border  | 表格边框 |Boolean|--|true|
| emptyText  | 空数据文本 |String|--|暂无数据|
| pageSizes  | 单页条数 |Array|--|[10, 20, 50, 100]|

---------------------------------------------------


## <a name="searchList"> **searchList 字段说明Array**  </a>


|  字段   | 说明  |类型|可选值|默认值|
|  ----  | ----  |---- | ----|----|
|type|组件类型|String|input:基本输入框<br/>autocomplete:带搜索输入框<br/>datetime：日期时间选择<br/>datePicker：日期选择<br/>dateRange：日期区间/<br/>dateTimePicker：日期时间区间<br/>select：下拉选择框<br/>cascader：级联选择器<br/>|--|
|label|显示文字|String|--|--|
|key|查询字段名|String|--|--|
|value/default|默认值|--|--|--|
|options|数据列表|Array|select、cascader专用|--|
|defaultProps|默认对应字段|Object|--|{label:"label",value:"value"}|
|debounce|输入延迟|Number|autocomplete专用|300|
|searchKey|匹配字段|String|autocomplete专用|value|
|getData|加载数据|Function(queryString, callback)|autocomplete专用|--|

---------------------------------------------------
## <a name="columns"> **columns 字段说明Array** </a>

|  字段   | 说明  |类型|可选值|默认值|
|  ----  | ----  |---- | ----|----|
|label|表头名|String|--|--|
|dataKey|表格字段|String|--|--|
|align|对齐方式|String|left/center/right|center|
|width|自定义列宽|Number|--|--|
|slotScope|自定义插槽名|String|--|--|
|fixed|是否固定列|Boolean/String|true/left/right|false|

## <a name="@change"> @change </a>


```javascipt
@change="onChange"

onChange(pagination){
    this.pagination=pagination;
    //分页改变时，需要更新当前分页对象，因.sync语法糖不支持object更新，只能手动更新
}
```

## <a name="@search"> @search </a>

```javascipt
@search="onSearch"

onSearch(params){
    //直接拿到组件参数去调用接口
    do something()
}
```


## <a name="@selectChange"> @selectChange </a>

```javascipt
@selectChange="onSelectChange"

onSelectChange(selected){
    
}
```