package com.motoo.api.request;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;


@Getter @Setter
public class UpdateUserProfileReq {


    @NotEmpty
    String nickname;

    @NotEmpty
    int school_id;

    @NotEmpty
    int current;



}
