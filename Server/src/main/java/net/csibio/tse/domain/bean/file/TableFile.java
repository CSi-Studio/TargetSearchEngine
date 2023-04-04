package net.csibio.tse.domain.bean.file;

import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
public class TableFile {

    HashMap<String, Integer> columnMap;

    List<String[]> fileData;

    public TableFile(){ }

    public TableFile(HashMap<String, Integer> indexMap, List<String[]> fileData){
        this.columnMap = indexMap;
        this.fileData = fileData;
    }

}
