package com.motoo.api.response;

import com.motoo.db.entity.Account;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SchoolRegiRes")
public class SchoolRegiRes {
    @ApiModelProperty(name = "학교계좌_Id")
    private Long Id;

    public static SchoolRegiRes response(Account acc){
        return new SchoolRegiRes(acc.getAccountId());
    }
}

