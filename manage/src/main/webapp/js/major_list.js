var baseUrl = "http://localhost:6060/";
var table;
var layer;
var $;
layui.use(['table', 'layer','jquery'], function () {
    table = layui.table;
    layer = layui.layer;
    $ = layui.jquery;
    //加载页面
    fenye();
    initEvent();
});
//初始化时间
function initEvent() {
    //监听工具条
    table.on('tool(majorList)', function (obj) {
        //注：tool 是工具条事件名，demo 是 table 原始容器的属性 lay-filter="对应的值"

        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if (layEvent === 'detail') { //查看
            var mid=  data.mid;

           var mname =  data.mname;

            showMajorInfo(mid);

        } else if (layEvent === 'del') { //删除
            layer.confirm('真的删除行么', function (index) {
                //obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                //向服务端发送删除指令
                deleteEditMajorInfo(data.mid)
                layer.close(index);
            });
        } else if (layEvent === 'edit') { //编辑
            toEditMajorInfo(data.mid);
        } else if (layEvent === 'LAYTABLE_TIPS') {
            layer.alert('Hi，头部工具栏扩展的右侧图标。');
        }
    });
}
//分页查询
function fenye() {
    var cid = $("#cidSelect_search").val();
    table.render({
        elem: '#majorList'
        , height: 520
        , url: baseUrl + 'major/list' //数据接口
        , page: true //开启分页
        , parseData: function (res) { //res 即为原始返回的数据
            var status = res.status == 200 ? 0 : res.status;
            return {
                "code": status, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.obj.total, //解析数据长度
                "data": res.obj.list //解析数据列表
            };
        }
        , where:{cid:cid}
        , cols: [[ //表头
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'mid', title: 'ID', width: 80, sort: true, fixed: 'left'}
            , {field: 'mname', title: '专业名称', width: 120}
            , {field: 'credit', title: '学分', width: 120, sort: true}
            , {field: 'lifeyear', title: '学制', width: 120}
            , {field: 'introduction', title: '专业简介', width: 177}
            , {field: 'cid', title: '学院Id', width: 120, sort: true}
            , {
                field: 'op',
                title: '操作',
                width: 200,
                toolbar: '#barDemo'
            }
        ]]
    });
}

//查看专业信息
function showMajorInfo(majorId){
//查看专业弹框
    layui.use(['layer', 'form', 'jquery'], function () { //独立版的layer无需执行这一句
        var layer = layui.layer; //独立版的layer无需执行这一句
        var $ = layui.jquery;
        var form = layui.form;
        //根据id获取改用户信息
     $.ajax({
            "url":  "major/shows",
            "type": "GET",
            "data": {majorId: majorId},
            "dataType": "json",
            success: function (data) {
                //console.log(data);
                $("#mids").val("");
                $("#mnames").val("");
                $("#credits").val("");
                $("#lifeyears").val("");
                $("#introductions").val("");
                $("#cidSelect_updates").val("");
                if (data && data.obj) {
                    var majorList = data.obj;
                    console.log(majorList)
                    $("#mids").val(majorList.mid);
                    $("#mnames").val(majorList.mname);
                    $("#credits").val(majorList.credit);
                    $("#lifeyears").val(majorList.lifeyear);
                    $("#introductions").val(majorList.introduction);
                    $("#cidSelect_updates").val(majorList.cid);
                }
            }
        })
        //事件
        var addIndex = 0;

            addIndex = layer.open({
                type: 1,    //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                area: '500px',
                //title: "",
                content: $('#majorvevwForm') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            });
    })
}
//编辑专业信息
function toEditMajorInfo(majorId){
    //修改专业弹框
    layui.use(['layer', 'form', 'jquery'], function () { //独立版的layer无需执行这一句
        var layer = layui.layer; //独立版的layer无需执行这一句
        var $ = layui.jquery;
        var form = layui.form;
        //根据id获取改用户信息
        $.ajax({
            "url":  "major/shows",
            "type": "GET",
            "data": {majorId: majorId},
            "dataType": "json",
            success: function (data) {
                //console.log(data);
                $("#mid").val("");
                $("#mname").val("");
                $("#credit").val("");
                $("#lifeyear").val("");
                $("#introduction").val("");
                $("#cidSelect_update").val("");
                if (data && data.obj) {
                    var majorList = data.obj;
                    console.log(majorList)
                    $("#mid").val(majorList.mid);
                    $("#mname").val(majorList.mname);
                    $("#credit").val(majorList.credit);
                    $("#lifeyear").val(majorList.lifeyear);
                    $("#introduction").val(majorList.introduction);
                    $("#cidSelect_update").val(majorList.cid);
                }
            }
        })
        //事件
         var addIndex = 0;
         addIndex = layer.open({
         type: 1,    //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
         area: '500px',
         //title: "",
         content: $('#majorUpdateForm') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
         });
        $("#updateMajorBtn").click(function () {
            //校验字段省略......
            //操作dom提示错误信息
            $.ajax({
                type: "post",
                url: baseUrl + 'major/update',
                data: $("#majorUpdateForm").serialize(),

                success: function (data) {
                    console.log("添加结果：");
                    console.log(data);

                    layer.msg("保存成功！");
                    location.href="major_list.html";
                    layer.close(addIndex);//关闭指定层
                    // layer.closeAll();
                },
                fail: function (data) {
                    alert("保存失败")
                }
            });
        })
    });
}

//删除专业信息
function deleteEditMajorInfo(majorId){
    //指定层
    //var addIndex = 0;
    var $ = layui.jquery;
    //alert("删除专业id："+majorId);
    $.ajax({
        "url":  "major/delete",
        "type": "GET",
        "data": {majorId: majorId},
        "dataType": "json",
        success: function (result) {
            if (result.success == true) {
                alert("删除成功")
                location.href="major_list.html";
                //layer.close(addIndex);//关闭指定层
            } else {
                alert("删除失败")
                //layer.close(addIndex);//关闭指定层
            }
        },
    })
}

//添加专业弹框
layui.use(['layer', 'form', 'jquery'], function () { //独立版的layer无需执行这一句
    var layer = layui.layer; //独立版的layer无需执行这一句
    var $ = layui.jquery;
    var form = layui.form;

    //获取学院列表
    $.ajax({
        type: "get",
        url: baseUrl + 'college/list',
        success: function (data) {
            console.log(data);
            if (data && data.obj) {
                var collegeList = data.obj;

                //更新select
                $("#cidSelect").html("<option value=\"0\">请选择学院</option>");
                for(var i=0; i<collegeList.length; i++){
                    var college = collegeList[i];
                    $("#cidSelect").append("<option value='"+college.cid+"'>"+college.cname+"</option>")
                }

                $("#cidSelect_search").html("<option value=\"0\">请选择学院</option>");
                for(var i=0; i<collegeList.length; i++){
                    var college = collegeList[i];
                    $("#cidSelect_search").append("<option value='"+college.cid+"'>"+college.cname+"</option>")
                }
                $("#cidSelect_update").html("<option value=\"0\">请选择学院</option>");
                 for(var i=0; i<collegeList.length; i++){
                 var college = collegeList[i];
                 $("#cidSelect_update").append("<option value='"+college.cid+"'>"+college.cname+"</option>")
                 }
                $("#cidSelect_vevw").html("<option value=\"0\">请选择学院</option>");
                for(var i=0; i<collegeList.length; i++){
                    var college = collegeList[i];
                    $("#cidSelect_vevw").append("<option value='"+college.cid+"'>"+college.cname+"</option>")
                }
                //更新view， lay-filter="addForm" 所在容器内的全部 select 状态
                form.render('select', 'majorListForm');
                form.render('select', 'majorAddForm');
                form.render('select', 'majorUpdateForm');
                form.render('select', 'majorvevwForm');
            }
        }
    });
    //事件
    var addIndex = 0;
    $("#toAddMajorBtn").click(function () {
        addIndex = layer.open({
            type: 1,    //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
            area: '500px',
            //title: "",
            content: $('#majorAddForm') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
    })
    $("#addMajorBtn").click(function () {
        //校验字段省略......
        //操作dom提示错误信息
        $.ajax({
            type: "post",
            url: baseUrl + 'major/add',
            data: $("#majorAddForm").serialize(),
            success: function (data) {


                console.log("添加结果：");
                console.log(data);

                layer.msg("保存成功！");
                layer.close(addIndex);//关闭指定层
                // layer.closeAll();
            },
            fail: function (data) {
                alert("保存失败")
            }
        });
    })
});
