package com.college.controller;

import com.college.common.entity.*;
import com.college.common.service.CollegeService;
import com.college.common.service.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Hunter on 2020-01-10.
 */
@Controller
@RequestMapping("/major")
public class MajorController {

    @Autowired
    private MajorService majorService;
    @Autowired
    private CollegeService collegeService;


    @ResponseBody
    @RequestMapping(value = "/list")
    public RespBean list(@RequestParam(name = "cid", required = false)  Integer cid, LayUIPage layUIPage){
        try {

            Major major = new Major();
            major.setCid(cid);

            Page<Major> pageInfo = majorService.getAll(major, layUIPage.getPage(), layUIPage.getLimit());
            return RespBean.ok("获取列表成功", pageInfo);
        }catch (Exception e) {
            e.printStackTrace();
            return RespBean.error("获取列表失败");
        }
    }
   /* @ResponseBody
    @RequestMapping(value = "/show")
    public RespBean show(@RequestParam(name = "mid", required = false)  Integer mid, Model model){
        Major major = majorService.getById(mid);
        model.addAttribute("major", major);
        return RespBean.ok("获取列表成功", major);
    }*/

    @ResponseBody
    @RequestMapping("/add")
    public RespBean add(Major major){
        //System.out.println("===========================add=================");
        //System.out.println(major);
        try {
            if(majorService.add(major)){
                return RespBean.ok("添加成功");
            }else {
                return RespBean.error("添加失败");
            }
        }catch (Exception e) {
            e.printStackTrace();
            return RespBean.error("添加失败");
        }
    }
    @ResponseBody
    @RequestMapping(value = "/shows")
    public RespBean show1(@RequestParam(name = "majorId", required = false)  Integer mid, Model model){
        Major major = majorService.getById(mid);
        model.addAttribute("major", major);
        return RespBean.ok("获取列表成功", major);
    }


    @ResponseBody
    @RequestMapping("/update")
    public RespBean update(Major major){
        try {
            if(majorService.update(major)){
                return RespBean.ok("修改成功");
            }else {
                return RespBean.error("修改失败");
            }
        }catch (Exception e) {
            e.printStackTrace();
            return RespBean.error("修改失败");
        }
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Object Majordeletes(@RequestParam(value = "majorId")
                                       Integer majorId) throws Exception {
        boolean i = majorService.delete(majorId);
        Map<String, Object> map = new HashMap<>();
        map.put("success",i);
        return map;
    }

}
