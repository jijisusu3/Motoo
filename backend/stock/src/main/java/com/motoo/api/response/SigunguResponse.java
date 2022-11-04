package com.motoo.api.response;

import com.motoo.db.entity.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SigunguResponse {

    private Long sigunguId;

    private String sigungu_name;

    private String sido;

    public static SigunguResponse response(Sigungu sigungu){
        return new SigunguResponse(sigungu.getSigunguId(), sigungu.getSigungu_name(), sigungu.getSido());
    }


}
