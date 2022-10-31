package com.motoo.api.dto.kakao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoProfile {
    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

}