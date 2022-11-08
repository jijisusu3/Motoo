package com.motoo.api.response;

import com.motoo.db.entity.School;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolResponse {

    private Long schoolId;

    private String schoolname;

    private SigunguResponse sigunguResponse;


    public static SchoolResponse response(School school){
        return new SchoolResponse(school.getSchoolId(), school.getSchoolname(), SigunguResponse.response(school.getSigungu()));
    }
}
