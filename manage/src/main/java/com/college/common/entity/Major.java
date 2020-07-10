package com.college.common.entity;

import javax.persistence.*;

public class Major {
    private Integer mid;

    private String mname;

    private Integer credit;

    @Column(name = "LifeYear")
    private Integer lifeyear;

    private String introduction;

    private Integer cid;

    /**
     * @return mid
     */
    public Integer getMid() {
        return mid;
    }

    /**
     * @param mid
     */
    public void setMid(Integer mid) {
        this.mid = mid;
    }

    /**
     * @return mname
     */
    public String getMname() {
        return mname;
    }

    /**
     * @param mname
     */
    public void setMname(String mname) {
        this.mname = mname == null ? null : mname.trim();
    }

    /**
     * @return credit
     */
    public Integer getCredit() {
        return credit;
    }

    /**
     * @param credit
     */
    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    /**
     * @return LifeYear
     */
    public Integer getLifeyear() {
        return lifeyear;
    }

    /**
     * @param lifeyear
     */
    public void setLifeyear(Integer lifeyear) {
        this.lifeyear = lifeyear;
    }

    /**
     * @return introduction
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * @param introduction
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    /**
     * @return cid
     */
    public Integer getCid() {
        return cid;
    }

    /**
     * @param cid
     */
    public void setCid(Integer cid) {
        this.cid = cid;
    }

    @Override
    public String toString() {
        return "Major{" +
                "mid=" + mid +
                ", mname='" + mname + '\'' +
                ", credit=" + credit +
                ", lifeyear=" + lifeyear +
                ", introduction='" + introduction + '\'' +
                ", cid=" + cid +
                '}';
    }
}