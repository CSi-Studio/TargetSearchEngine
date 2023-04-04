package net.csibio.tse.utils;

import net.csibio.tse.constants.enums.ElementType;
import net.csibio.tse.domain.bean.chemical.OpElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ElementUtil {

    public static final Logger logger = LoggerFactory.getLogger(ElementUtil.class);

    public static HashMap<String, Integer> getElementMap(String formula) {

        if (formula == null || formula.isEmpty()) {
            return null;
        }
        HashMap<String, Integer> elementMap = new HashMap<>();
        try {
            String[] kvPairs = formula.split(",");
            for (String kvPair : kvPairs) {
                String[] kv = kvPair.split(":");
                elementMap.put(kv[0], Integer.parseInt(kv[1]));
            }
        } catch (Exception e) {
            logger.error("Formula Parse Error:", e);
        }

        return elementMap;
    }

    public static List<OpElement> getOpElementList(String formula) {
        if (formula == null || formula.isEmpty()) {
            return null;
        }
        List<OpElement> opElements = new ArrayList<>();
        try {
            String[] kvPairs = formula.split(",");
            for (String kvPair : kvPairs) {
                String[] kv = kvPair.split(":");
                opElements.add(OpElement.build("+", Integer.parseInt(kv[1]), ElementType.getBySymbol(kv[0])));
            }
        } catch (Exception e) {
            logger.error("Formula Parse Error:", e);
        }
        return opElements;
    }
}
