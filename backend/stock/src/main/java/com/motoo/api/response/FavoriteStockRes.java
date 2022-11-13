package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@ApiModel("FavoriteStockResponse")
public class FavoriteStockRes extends BaseResponseBody {

    @ApiModelProperty(name = "관심주식 리스트")
    private List<String> favoriteStockCodeList;

    public static FavoriteStockRes of(List<String> favoriteStockCodeList, Integer statusCode, String message) {
        FavoriteStockRes res = new FavoriteStockRes();
        res.setFavoriteStockCodeList(favoriteStockCodeList);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
