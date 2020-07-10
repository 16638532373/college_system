package com.college.common.service;

import com.college.common.entity.Major;
import com.college.common.entity.Page;

import java.util.List;

/**
 * Created by Hunter on 2020-01-10.
 */
public interface MajorService {
    //根据主键id查询
    public Major getById(int id);
    //添加
    public boolean add(Major major);
    //修改
    public boolean update(Major major);
    //删除
    public boolean delete(int mid);
    //查询major集合所有数据
    public List<Major> getAll();
    //根据cid查询major集合所有数据
    public List<Major> getList(Integer cid);
    //分页
    public Page<Major> getAll(Major major, int pageNo, int limit);
}
