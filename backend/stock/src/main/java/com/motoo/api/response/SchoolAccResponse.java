package com.motoo.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolAccResponse {


    private Integer myRank;

    private Integer asset;

    private Float myAvg;

    private Long schoolAccId;

    public static SchoolAccResponse response(Integer r, Integer as, Float av, Long schoolAccId){
        return new SchoolAccResponse(r, as, av, schoolAccId);
    }
    }

