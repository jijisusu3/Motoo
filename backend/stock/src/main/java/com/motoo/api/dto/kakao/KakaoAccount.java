package com.motoo.api.dto.kakao;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class KakaoAccount {

    private Boolean profile_nickname_needs_agreement;
    private Profile profile;
    private Boolean has_email;
    private Boolean email_needs_agreement;
    private Boolean is_email_valid;
    private Boolean is_email_verified;
    private String email;
}
