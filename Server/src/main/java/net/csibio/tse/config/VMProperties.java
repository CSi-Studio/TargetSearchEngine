package net.csibio.tse.config;

import net.csibio.tse.utils.RepositoryUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component("vmProperties")
public class VMProperties {
    @Value("${repository}")
    private String repository;

    @Value("${export}")
    private String export;

    @PostConstruct
    public void init() {
        RepositoryUtil.repository = repository;
    }

    public void setRepository(String repository) {
        this.repository = repository;
    }

    public String getRepository() {
        if (StringUtils.isEmpty(repository)) {
            return "/nas/data";
        }
        return repository;
    }

    public void setExport(String export) {
        this.export = export;
    }

    public String getExport() {
        if (StringUtils.isEmpty(export)) {
            return "/nas/export";
        }
        return export;
    }
}
