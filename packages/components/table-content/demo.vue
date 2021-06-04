<template>
    <div class="order-list page">
        <table-content :search-list="searchList" :table-data="tableData" @search="getTableData" :columns="columns" @selectChange="selectChange" :showOverflowTooltip="true"
            :pagination.sync="pagination">
            <template #btns>
                <el-button type="primary" size="small">导出订单</el-button>
                <el-button type="danger" size="small">批量删除</el-button>
            </template>
            <template #action="{row}">
                <el-button type="text" size="small" @click="delItem(row)">删除</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </table-content>
    </div>
</template>

<script>
import tableContent from "@/components/table-content";
export default {
    name: "demo",
    components: {
        tableContent
    },
    data() {
        return {
            activeName: "user",
            tabIndex: 0,
            searchList: [
                {
                    type: "input",
                    label: "订单编号",
                    key: "orderId"
                },
                {
                    type: "input",
                    label: "收货人/手机号",
                    key: "phone"
                },
                {
                    type: "datePicker",
                    label: "日期",
                    key: "date"
                },
                {
                    type: "dateRange",
                    label: "日期",
                    key: "dateRange",
                    start: "startDate",
                    end: "endDate"
                },
                {
                    type: "dateRange",
                    label: "日期",
                    key: "dateRange1",
                    start: "startDate1",
                    end: "endDate1"
                },
                {
                    type: "select",
                    label: "订单状态",
                    key: "status",
                    options: [
                        { label: "全部订单", value: 0 },
                        { label: "待支付", value: 1 },
                        { label: "待发货", value: 2 },
                        { label: "待收货", value: 3 },
                        { label: "已完成", value: 4 },
                        { label: "已关闭", value: 5 },
                    ]
                }
            ],
            columns: [
                {
                    label: "序号",
                    type: "index",
                },
                {
                    label: "订单编号",
                    dataKey: "orderId"
                },
                {
                    label: "提交时间",
                    dataKey: "date",
                },
                {
                    label: "省",
                    dataKey: "province",
                },
                {
                    label: "市",
                    dataKey: "city",
                },
                {
                    label: "地址",
                    dataKey: "address"
                },
                {
                    label: "操作",
                    slotScope: "action"
                }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                orderId: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                orderId: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                orderId: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                orderId: 200333
            }],
            orderId: "",
            user: "",
            orderDate: '',
            orderType: "",
            searchForm: {},
            pagination: {
                page: 1,
                pageSize: 10,
                total: 400
            },
            filename: '订单列表'
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        selectChange(list) {
            console.log(list)
        },
        delItem(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success("删除成功!");
            }).catch(() => { });
        },
        getTableData(params) {
            console.log(this.pagination, params)
        },
        delOrder(row) {
            this.$confirm('是否确定要删除此订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch();
        }
    }
}
</script>

<style scoped lang="scss">
.order-list {
    .table-wrapper {
        padding: 20px;
        margin-top: 10px;
    }
}
</style>
