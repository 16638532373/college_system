package com.college.common.entity;

import java.util.Date;
import javax.persistence.*;

public class College {
    @Id
    private Integer cid;

    private String cname;

    private String caddress;

    private Date createtime;

    private String cpic;

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

    /**
     * @return cname
     */
    public String getCname() {
        return cname;
    }

    /**
     * @param cname
     */
    public void setCname(String cname) {
        this.cname = cname == null ? null : cname.trim();
    }

    /**
     * @return caddress
     */
    public String getCaddress() {
        return caddress;
    }

    /**
     * @param caddress
     */
    public void setCaddress(String caddress) {
        this.caddress = caddress == null ? null : caddress.trim();
    }

    /**
     * @return createtime
     */
    public Date getCreatetime() {
        return createtime;
    }

    /**
     * @param createtime
     */
    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    /**
     * @return cpic
     */
    public String getCpic() {
        return cpic;
    }

    /**
     * @param cpic
     */
    public void setCpic(String cpic) {
        this.cpic = cpic == null ? null : cpic.trim();
    }
}