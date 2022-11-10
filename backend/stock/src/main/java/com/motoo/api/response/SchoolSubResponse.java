package com.motoo.api.response;


import com.motoo.db.entity.School;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolSubResponse {
    private Long schoolId;

    private String schoolname;

    private Integer rank;

    private Float average;

    private String today;

    private SigunguSubResponse sigunguSubResponse;

    public static SchoolSubResponse response(School school){
        return new SchoolSubResponse(school.getSchoolId(), school.getSchoolname(), school.getRank(), school.getAverage(), school.getToday(), SigunguSubResponse.response(school.getSigungu()));
    }


}
