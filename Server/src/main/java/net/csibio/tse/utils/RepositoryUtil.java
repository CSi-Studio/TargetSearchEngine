package net.csibio.tse.utils;

import org.apache.commons.io.FilenameUtils;

public class RepositoryUtil {

    public static String repository;

    public static String getRepo() {
        return repository;
    }

    public static String getProjectRepo(String projectName) {
        return FilenameUtils.concat(repository, projectName);
    }

    public static String getSetRepo(String projectName, String platform, String setName) {
        return FilenameUtils.concat(FilenameUtils.concat(FilenameUtils.concat(repository, projectName), platform), setName);
    }

    public static String getProjectTempRepo(String projectName) {
        return FilenameUtils.concat(getProjectRepo(projectName), "temp");
    }

    public static String buildOutputPath(String projectName, String fileName) {
        String folderPath = FilenameUtils.concat(repository, projectName);
        return FilenameUtils.concat(folderPath, fileName);
    }
}
