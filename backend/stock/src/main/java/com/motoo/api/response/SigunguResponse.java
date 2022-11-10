package com.motoo.api.response;

import com.motoo.db.entity.Sigungu;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SigunguResponse")
public class SigunguResponse {


    @ApiModelProperty(name = "시군구 Id")
    private Long sigunguId;
    @ApiModelProperty(name = "시군구 이름")
    private String sigungu_name;
    @ApiModelProperty(name = "시도")
    private String sido;

    public static SigunguResponse response(Sigungu sigungu){
        return new SigunguResponse(sigungu.getSigunguId(), sigungu.getSigungu_name(), sigungu.getSido());
    }


}
