package com.motoo.api.response;

import com.motoo.db.entity.School;
import com.motoo.db.entity.Sigungu;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolResponse {

    private Long id;

    private String schoolname;

//    private Sigungu sigungu;

    public static SchoolResponse response(School school){
        return new SchoolResponse(school.getSchoolId(), school.getSchoolname());
    }
}
