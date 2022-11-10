package com.motoo.api.response;

import com.motoo.db.entity.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SigunguSubResponse {
    private Long sigunguId;

    private String sigungu_name;

    private String school_ranks;

    private String personal;

    public static SigunguSubResponse response(Sigungu sigungu){
        return new SigunguSubResponse(sigungu.getSigunguId(), sigungu.getSigungu_name(), sigungu.getSchool_ranks(), sigungu.getPersonal());
    }


}
