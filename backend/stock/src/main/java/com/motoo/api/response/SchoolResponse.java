package com.motoo.api.response;

import com.motoo.db.entity.School;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SchoolResponse")
public class SchoolResponse {
    @ApiModelProperty(name = "학교_Id")
    private Long schoolId;
    @ApiModelProperty(name = "학교 이름")
    private String schoolname;
    @ApiModelProperty(name = "SigunguResponse")
    private SigunguResponse sigunguResponse;




    public static SchoolResponse response(School school){
        return new SchoolResponse(school.getSchoolId(), school.getSchoolname(), SigunguResponse.response(school.getSigungu()));
    }
}
