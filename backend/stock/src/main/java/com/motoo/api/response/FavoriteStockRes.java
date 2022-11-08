package com.motoo.api.response;

import com.motoo.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class FavoriteStockRes extends BaseResponseBody {
    private List<String> favoriteStockCodeList;

    public static FavoriteStockRes of(List<String> favoriteStockCodeList, Integer statusCode, String message) {
        FavoriteStockRes res = new FavoriteStockRes();
        res.setFavoriteStockCodeList(favoriteStockCodeList);
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}
