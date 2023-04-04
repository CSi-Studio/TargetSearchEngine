package net.csibio.tse.controller;

import net.csibio.tse.domain.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @RequestMapping("/search")
    Result search() {
        return Result.OK();
    }
}
